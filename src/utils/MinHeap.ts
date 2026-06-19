import type { AppNotification } from '../types/notification';
import { calculatePriority } from './priorityCalculator';

export class MinHeap {
  private heap: { notification: AppNotification; score: number }[] = [];
  private maxSize: number;

  constructor(maxSize: number = 10) {
    this.maxSize = maxSize;
  }

  private parent(index: number) { return Math.floor((index - 1) / 2); }
  private leftChild(index: number) { return 2 * index + 1; }
  private rightChild(index: number) { return 2 * index + 2; }

  private swap(index1: number, index2: number) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  private heapifyUp(index: number) {
    let currentIndex = index;
    while (currentIndex > 0 && this.heap[this.parent(currentIndex)].score > this.heap[currentIndex].score) {
      this.swap(currentIndex, this.parent(currentIndex));
      currentIndex = this.parent(currentIndex);
    }
  }

  private heapifyDown(index: number) {
    let minIndex = index;
    const left = this.leftChild(index);
    const right = this.rightChild(index);

    if (left < this.heap.length && this.heap[left].score < this.heap[minIndex].score) {
      minIndex = left;
    }

    if (right < this.heap.length && this.heap[right].score < this.heap[minIndex].score) {
      minIndex = right;
    }

    if (minIndex !== index) {
      this.swap(index, minIndex);
      this.heapifyDown(minIndex);
    }
  }

  public size() {
    return this.heap.length;
  }

  public peek() {
    return this.heap[0];
  }

  public removeMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return min;
  }

  public replaceMin(item: { notification: AppNotification; score: number }) {
    this.heap[0] = item;
    this.heapifyDown(0);
  }

  public insert(notification: AppNotification) {
    const score = calculatePriority(notification);

    if (this.heap.some(item => item.notification.id === notification.id)) {
        return;
    }

    if (this.heap.length < this.maxSize) {
      this.heap.push({ notification, score });
      this.heapifyUp(this.heap.length - 1);
    } else if (score > this.heap[0].score) {
      this.replaceMin({ notification, score });
    }
  }

  public getTopNotifications(): AppNotification[] {
    return [...this.heap]
      .sort((a, b) => b.score - a.score)
      .map(item => item.notification);
  }
}
