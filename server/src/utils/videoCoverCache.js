class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.frequency = 1;
        this.prev = null;
        this.next = null;
    }
}

class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.cache = new Map();
        this.freqMap = new Map();
        this.minFreq = 0;
    }

    get(key) {
        if (!this.cache.has(key)) return -1;

        const node = this.cache.get(key);
        this.updateFrequency(node);
        return node.value;
    }

    put(key, value) {
        if (this.capacity === 0) return;

        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            node.value = value;
            this.updateFrequency(node);
        } else {
            if (this.size >= this.capacity) {
                const minFreqList = this.freqMap.get(this.minFreq);
                const toDelete = minFreqList.tail.prev;
                minFreqList.removeNode(toDelete);
                this.cache.delete(toDelete.key);
                this.size--;
            }

            const newNode = new Node(key, value);
            this.cache.set(key, newNode);
            if (!this.freqMap.has(newNode.frequency)) {
                this.freqMap.set(newNode.frequency, new DoublyLinkedList());
            }
            const freqList = this.freqMap.get(newNode.frequency);
            freqList.addToHead(newNode);
            this.minFreq = 1;
            this.size++;
        }
    }

    updateFrequency(node) {
        const freqList = this.freqMap.get(node.frequency);
        freqList.removeNode(node);
        if (node.frequency === this.minFreq && freqList.isEmpty()) {
            this.minFreq++;
        }
        node.frequency++;
        if (!this.freqMap.has(node.frequency)) {
            this.freqMap.set(node.frequency, new DoublyLinkedList());
        }
        const newFreqList = this.freqMap.get(node.frequency);
        newFreqList.addToHead(node);
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = new Node(null, null);
        this.tail = new Node(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    isEmpty() {
        return this.head.next === this.tail;
    }
}

const videoCoverCache = new LFUCache(100);

module.exports = {videoCoverCache};
