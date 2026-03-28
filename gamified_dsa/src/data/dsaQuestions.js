const dsaQuestions = [
  {
    id: 1,
    level: "basic",
    topic: "Arrays",
    areaId: "zone-1",
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: "O(1)",
    explanation: "Array indexing is constant time because memory is contiguous."
  },
  {
    id: 2,
    level: "basic",
    topic: "Strings",
    areaId: "zone-2",
    question: "Which data structure works on FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: "Queue",
    explanation: "Queue follows First In First Out."
  },
  {
    id: 3,
    level: "intermediate",
    topic: "Linked List",
    areaId: "zone-3",
    question: "What is the time complexity to insert at the head of a singly linked list?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: "O(1)",
    explanation: "You only update the head pointer."
  },
  {
    id: 4,
    level: "intermediate",
    topic: "Stacks",
    areaId: "zone-4",
    question: "Which problem is commonly solved using a stack?",
    options: [
      "Binary Search",
      "Balanced Parentheses",
      "Dijkstra Shortest Path",
      "Minimum Spanning Tree"
    ],
    correctAnswer: "Balanced Parentheses",
    explanation: "Stacks are ideal for matching nested brackets."
  },
  {
    id: 5,
    level: "advanced",
    topic: "Trees",
    areaId: "zone-5",
    question: "What is the average time complexity of search in a balanced BST?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: "O(log n)",
    explanation: "A balanced BST keeps height logarithmic."
  },
  {
    id: 6,
    level: "advanced",
    topic: "Graphs",
    areaId: "zone-6",
    question: "Which algorithm is used to find shortest paths from one source in a weighted graph with non-negative edges?",
    options: ["DFS", "BFS", "Dijkstra", "KMP"],
    correctAnswer: "Dijkstra",
    explanation: "Dijkstra solves single-source shortest path for non-negative weights."
  }
];

export default dsaQuestions;