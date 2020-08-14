# XML 文件解析

## XML 转 Json

### 使用 x2js 库

x2js 是一个将 XML 转为 JSON（JavaScript对象）的库。

#### API

参见：<https://github.com/x2js/x2js/blob/development/x2js.d.ts>

- `new X2JS(config?)` - 创建 x2js 实例
- `<instance>.xml2js` - 将XML 字符串转换为 JSON 对象
- `<instance>.xml2dom` - 将XML 字符串转换为 DOM 树
- `<instance>.js2xml` - 将 JSON 对象转换为 XML 字符串
- `<instance>.js2dom` - 将 JSON 对象转换为 DOM 树
- `<instance>.dom2js` - 将 DOM 树转换为 JSON 对象



示例：

```js
import X2JS from 'x2js';

const x2jsObj = new X2JS();
const xmlJson = x2jsObj.xml2js(xmlData);
console.log(xmlJson);
```



### 原生实现

思路：

首先将 xml 转换为 dom 对象，再从 dom 对象里获取需要的参数，转为 json 对象。

```js
/**
 * xml 转 json 对象，参考：https://github.com/x2js/x2js
 */

const DOMNodeTypes = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
};

function parseXml(xml) {
    if (xml === undefined || typeof xml !== 'string') {
        return null;
    }
    let parser = null;
    let domNode = null;

    if (window && window.DOMParser) {
        parser = new window.DOMParser();
        let parsererrorNS = null;
        const isIEParser = window.ActiveXObject || 'ActiveXObject' in window;

        // IE9+ now is here
        if (!isIEParser && document.all && !document.addEventListener) {
            try {
                parsererrorNS = parser.parseFromString('INVALID', 'text/xml').childNodes[0].namespaceURI;
            } catch (err) {
                parsererrorNS = null;
            }
        }

        try {
            domNode = parser.parseFromString(xml, 'text/xml');
            if (parsererrorNS !== null && domNode.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0) {
                domNode = null;
            }
        } catch (err) {
            domNode = null;
        }
    } else {
        // IE :(
        if (xml.indexOf('<?') === 0) {
            // eslint-disable-next-line no-param-reassign
            xml = xml.substr(xml.indexOf('?>') + 2);
        }

        /* global ActiveXObject */
        domNode = new ActiveXObject('Microsoft.XMLDOM');
        domNode.async = 'false';
        domNode.loadXML(xml);
    }
    return domNode;
}

function getDomNodeLocalName(domNode) {
    return domNode.localName || domNode.baseName || domNode.nodeName;
}

function getDomNodeNamespacePrefix(node) {
    return node.prefix;
}

function unescapeXmlChars(str) {
    return str
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&amp;/g, '&');
}

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
function deserializeElementChildren(element, elementPath) {
    let result = {};
    result.__cnt = 0;

    const nodeChildren = element.childNodes;

    // Child nodes.
    for (let iChild = 0; iChild < nodeChildren.length; iChild += 1) {
        const child = nodeChildren.item(iChild);
        const childName = getDomNodeLocalName(child);

        if (child.nodeType !== DOMNodeTypes.COMMENT_NODE) {
            result.__cnt += 1;
            // We deliberately do not accept everything falsey here because
            // elements that resolve to empty string should still be preserved.
            if (result[childName] == null) {
                result[childName] = deserializeDomChildren(child, `${elementPath}.${childName}`);
            } else {
                if (!(result[childName] instanceof Array)) {
                    result[childName] = [result[childName]];
                }

                result[childName][result[childName].length] = deserializeDomChildren(child, `${elementPath}.${childName}`);
            }
        }
    }

    // Attributes
    for (let iAttribute = 0; iAttribute < element.attributes.length; iAttribute += 1) {
        const attribute = element.attributes.item(iAttribute);
        result.__cnt += 1;

        result[`_${attribute.name}`] = attribute.value;
    }

    // Node namespace prefix
    const namespacePrefix = getDomNodeNamespacePrefix(element);
    if (namespacePrefix) {
        result.__cnt += 1;
        result.__prefix = namespacePrefix;
    }

    if (result['#text']) {
        result.__text = result['#text'];

        if (result.__text instanceof Array) {
            result.__text = result.__text.join('\n');
        }

        result.__text = unescapeXmlChars(result.__text);
        result.__text = result.__text.trim();

        delete result['#text'];
    }

    if (Object.prototype.hasOwnProperty.call(result, '#cdata-section')) {
        result.__cdata = result['#cdata-section'];
        delete result['#cdata-section'];
    }

    if (result.__cnt === 1 && result.__text) {
        result = result.__text;
    } else if (result.__cnt === 0) {
        result = '';
    } else if (result.__cnt > 1 && result.__text !== undefined) {
        if (result.__text === '' || result.__text.trim() === '') {
            delete result.__text;
        }
    }
    delete result.__cnt;

    /**
     * We are checking if we are creating a __cdata property
     * or if we just add the content of cdata inside result.
     * But, if we have a property inside xml tag (<tag PROPERTY="1"></tag>),
     * and a cdata inside, we can't ignore it.
     * In this case we are keeping __cdata property.
     */
    if (!Object.prototype.hasOwnProperty.call(result, '__text') && Object.prototype.hasOwnProperty.call(result, '__cdata') && Object.keys(result).length === 1) {
        return (result.__cdata ? result.__cdata : '');
    }

    if (result.__text || result.__cdata) {
        result.toString = function toString() {
            return (this.__text ? this.__text : '') + (this.__cdata ? this.__cdata : '');
        };
    }

    return result;
}

function deserializeRootElementChildren(rootElement) {
    const result = {};
    const children = rootElement.childNodes;

    // Alternative for firstElementChild which is not supported in some environments
    for (let i = 0; i < children.length; i += 1) {
        const child = children.item(i);
        if (child.nodeType === DOMNodeTypes.ELEMENT_NODE) {
            const childName = getDomNodeLocalName(child);

            result[childName] = deserializeDomChildren(child, childName);
        }
    }

    return result;
}

function deserializeDomChildren(node, parentPath) {
    if (node.nodeType === DOMNodeTypes.DOCUMENT_NODE) {
        return deserializeRootElementChildren(node);
    }

    if (node.nodeType === DOMNodeTypes.ELEMENT_NODE) {
        return deserializeElementChildren(node, parentPath);
    }

    if (node.nodeType === DOMNodeTypes.TEXT_NODE
        || node.nodeType === DOMNodeTypes.CDATA_SECTION_NODE) {
        return node.nodeValue;
    }

    return null;
}

/**
 * dom树转json对象
 * @param {Object} domNode
 */
export function dom2js(domNode) {
    console.log(domNode);
    return deserializeDomChildren(domNode, null);
}

/**
 * xml字符串转json对象
 * @param {String} xml
 */
export function xml2js(xml) {
    const domNode = parseXml(xml);
    if (domNode !== null) {
        return dom2js(domNode);
    }
    return null;
}
```

步骤：

1. 将 xml 字符串转为 dom 树：[`parseXml(xml)`](https://github.com/x2js/x2js/blob/development/x2js.js#L644)
   a. 如果有 [window.DOMParser](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser)，调用 `parser.parseFromString()` 实现DOM树的转换。
   b. 否则，调用 `ActiveXObject('Microsoft.XMLDOM')` 定义 xmlDom 对象，实现DOM树的转换。
2. 将 dom 树转为 json 对象：[`deserializeDomChildren(node, parentPath)`](https://github.com/x2js/x2js/blob/development/x2js.js#L445)
   根据 [node.nodeType](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType) 进入到不同的处理逻辑：
   a. 如果是 DOCUMENT_NODE，表明为根节点，调用 [`deserializeRootElementChildren(node)`](https://github.com/x2js/x2js/blob/development/x2js.js#L314)。
       i. 遍历根节点的子节点，如果子节点是 ELEMENT_NODE 类型，将其放入`result[childName]` 中，对应的值为调用 `deserializeDomChildren(child, childName)` 得到的返回值。
       ii. 返回 `result`。
   b. 如果是 ELEMENT_NODE，调用 [`deserializeElementChildren(node, parentPath)`](https://github.com/x2js/x2js/blob/development/x2js.js#L334)。
       i. 遍历传入节点的子节点，如果子节点不是COMMENT_NODE类型，将其放入 `result[childName]` 中，对应的值如果为空，则为调用 `deserializeDomChildren(child, childName)` 得到的返回值，如果不为空，则将 `result[childName]` 变为一个数组，push 调用 `deserializeDomChildren(child, childName)` 得到的返回值。
       ii. 遍历传入节点的属性，将其放入 `result['_' + attribute.name]` 中，值为 `attribute.value`。
       iii. 将 `result['#text']` 变为 `result.__text`。
       iv. 将 `result['#cdata-section']` 变为 `result.__cdata`。
       v. 如果标签纯文本，则 `result = result.__text`；如果为空标签，则 `result = ''`；如果标签有其他属性且文本为空，则删除 `result.__text`。
       vi. 对 `result.__cdata` 和 `result.__text` 为空等情况进行特殊处理。
       vii. 返回 `result`。
   c. 如果是 TEXT_NODE 或 CDATA_SECTION_NODE，直接返回节点数据 [node.nodeValue](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeValue)。



## 参考链接

[x2js,x2js XML到JSON和返回JavaScript,下载x2js的源码_ ...](https://www.kutu66.com/GitHub/article_99928)

[x2js - npm](https://www.npmjs.com/package/x2js)

[DOMParser | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser)

[ActiveXObject - MDN Web Docs - Mozilla](https://developer.mozilla.org/zh-CN/docs/Archive/Web/JavaScript/Microsoft_Extensions/ActiveXObject)

[Node.nodeType - Web API 接口参考| MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType)

[Node.localName - Web API 接口参考| MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/localName)

[Node.nodeName | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeName) 

[NodeList | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList)

