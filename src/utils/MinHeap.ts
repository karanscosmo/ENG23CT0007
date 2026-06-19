import { AppNotification } from '../types';
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

  public insert(notification: AppNotification) {
    const score = calculatePriority(notification);

    // Filter duplicates before insertion (based on ID)
    if (this.heap.some(item => item.notification.id === notification.id)) {
        return;
    }

    if (this.heap.length < this.maxSize) {
      this.heap.push({ notification, score });
      this.heapifyUp(this.heap.length - 1);
    } else if (score > this.heap[0].score) {
      this.heap[0] = { notification, score };
      this.heapifyDown(0);
    }
  }

  public getTopNotifications(): AppNotification[] {
    // Return sorted by highest priority first
    return [...this.heap]
      .sort((a, b) => b.score - a.score)
      .map(item => item.notification);
  }
}
