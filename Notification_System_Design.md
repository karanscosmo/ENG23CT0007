# Notification System Design - Stage 1

## Problem Statement
The application receives an ongoing stream of notifications. Users need a reliable way to view all notifications while simultaneously seeing a priority-sorted "inbox" of the most critical notifications. A naive sort of all notifications every time a new one arrives would be inefficient as the dataset grows. The system needs to calculate priority based on explicit business rules and efficiently maintain the top 10 notifications.

## Architecture
The solution consists of three core components:
1. **API Layer (`api/notifications.ts`)**: Handles fetching the raw notifications and supports filtering/pagination.
2. **Priority Calculator (`utils/priorityCalculator.ts`)**: Determines the raw score of any given notification based on its type and recency.
3. **MinHeap (`utils/MinHeap.ts`)**: A data structure designed to efficiently maintain a small collection (e.g., Top 10) of the highest-scoring items from a larger stream.

## Priority Calculation Formula
The priority is calculated using the following rules:
- **Placement**: Weight 3
- **Result**: Weight 2
- **Event**: Weight 1

To combine type weight and recency into a single numerical score:
`Score = (TypeWeight * 10^13) + TimestampInMilliseconds`

This ensures that the notification type is the primary sorting key, while the exact millisecond timestamp acts as a tie-breaker (newer notifications score slightly higher).

## Notification Ranking Strategy
As notifications are fetched or received, their score is calculated. They are then evaluated against the current Top 10 collection.

## Top 10 Selection Logic
The MinHeap utility is used to track the Top 10 notifications. The heap stores notifications and their calculated scores. The minimum element in the heap (the 10th highest priority overall) is always at the root, making it easily accessible for comparison.

## Min Heap Design
- **Insertion Rule 1**: If the heap currently has fewer than 10 elements, the new notification is immediately inserted, and the heap properties are restored (`heapifyUp`).
- **Insertion Rule 2**: If the heap has 10 elements, the new notification's score is compared against the root (the lowest score currently in the Top 10). If the new score is higher, the root is replaced, and the heap properties are restored (`heapifyDown`).

## Scalability Plan
- **Current Strategy**: In-memory MinHeap on the frontend.
- **Future Strategy**: Move the priority calculation and heap maintenance to a backend service (e.g., Redis Sorted Sets) if the volume of notifications or concurrent connected clients grows significantly. The frontend would then simply query the pre-calculated `priority_inbox` endpoint.

## Complexity Analysis
- **Time Complexity**: Inserting into a MinHeap of size K takes `O(log K)`. Since K is fixed at 10 (or 15, 20), the insertion time is effectively `O(1)`. Processing N incoming notifications takes `O(N log K)`.
- **Space Complexity**: `O(K)` where K is the maximum heap size (10). Memory footprint is minimal.

## Future Improvements
- Implement WebSockets or Server-Sent Events (SSE) for real-time priority inbox updates instead of polling or single-fetch.
- Enhance the priority calculator with user-specific preferences (e.g., if a user mutes "Event" notifications, the weight drops to 0).

## Logging Integration Strategy
The custom `Log` middleware is integrated deeply into the calculation logic. Specifically:
- `Log('utils', 'info', 'priorityCalculator', 'Priority calculation started...')`
- `Log('utils', 'info', 'priorityCalculator', 'Priority calculation completed...')`
- Errors during timestamp parsing or priority evaluation are caught gracefully and logged with `'error'` level without exposing `console.log` in production.
