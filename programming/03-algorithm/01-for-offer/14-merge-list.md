# 合并两个排序的链表

## 题目

输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。



## 题解

循环遍历到链表尾端，合并链表

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function Merge(pHead1, pHead2) {
    if (!pHead1) {
        return pHead2;
    } else if (!pHead2) {
        return pHead1;
    }
    
    var current = null;
    var pHead = null;
    
    while (pHead1 && pHead2) {
        if (pHead1.val < pHead2.val) {
            if (!pHead) {
                pHead = current = pHead1;
            } else {
                current.next = pHead1;
                current = current.next;
            }
            pHead1 = pHead1.next;
        } else {
            if (!pHead) {
                pHead = current = pHead2;
            } else {
                current.next = pHead2;
                current = current.next;
            }
            pHead2 = pHead2.next;
        }
    }
    
    if (!pHead1) {
        current.next = pHead2;
    } else {
        current.next = pHead1;
    }
    
    return pHead;
}
```

递归法：

```js
function Merge(pHead1, pHead2)
{
    if (!pHead1) return pHead2;
    if (!pHead2) return pHead1;
    
    var pHead = null;
    
    if (pHead1.val < pHead2.val) {
        pHead = pHead1;
        pHead.next = Merge(pHead1.next, pHead2);
    } else {
        pHead = pHead2;
        pHead.next = Merge(pHead1, pHead2.next);
    }
    
    return pHead;
}
```

## 参考链接

[牛客网](https://www.nowcoder.com/practice/d8b6b4358f774294a89de2a6ac4d9337?tpId=13&&tqId=11169&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

