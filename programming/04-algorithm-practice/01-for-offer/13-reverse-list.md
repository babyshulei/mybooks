# 反转链表

## 题目

输入一个链表，反转链表后，输出新链表的表头。



## 题解

```js
function ReverseList(pHead)
{
    // phead为当前节点，如果当前节点为空的话，那就什么也不做，直接返回null；
    // pre为当前节点的前一节点，next为当前节点的下一节点
    // pre->head->next1->next2变成pre<-head next1->next2
    // pre让节点反转方向，next用来保存下一节点信息，防止循环断掉
    let pre = null;
    let next = null;
    
    while (pHead) {
        // next 保存下一节点信息
        next = pHead.next;
        // 反转方向
        pHead.next = pre;
        // pre前移，pHead节点已反转完毕
        pre = pHead;
        // pHead 指向下一节点，继续循环
        pHead = next;
    }
    
    return pre;
}
```



[牛客网](https://www.nowcoder.com/practice/75e878df47f24fdc9dc3e400ec6058ca?tpId=13&&tqId=11168&rp=1&ru=/activity/oj&qru=/ta/coding-interviews/question-ranking)

