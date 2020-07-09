# 链表中倒数第k个结点

## 题目

输入一个链表，输出该链表中倒数第k个结点。



## 题解

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindKthToTail(head, k)
{
    let count = 0;
    let ret = head;
    let tmp = head;
    while(tmp) {
        tmp = tmp.next;
        if (count < k) {
            count++;
        } else {
            ret = ret.next;
        }
    }
    
    return count < k ? null : ret;
}
```



[牛客网](https://www.nowcoder.com/practice/529d3ae5a407492994ad2a246518148a?tpId=13&&tqId=11167&rp=1&ru=/activity/oj&qru=/ta/coding-interviews/question-ranking)

