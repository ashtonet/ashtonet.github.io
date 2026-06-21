export type Project = {
  title: string
  languages: string[]
  categories: string[]
  image: string
  href: string
  description: string
  date?: string
}

const oldSite = 'https://aethom00.github.io'

export const projects: Project[] = [
  {
    title: 'Geoguessr AI', languages: ['Python', 'TensorFlow', 'Keras'], categories: ['Python', 'Machine Learning'], image: `${oldSite}/new_images/world-map.png`, href: `${oldSite}/mhacks_geoguessr`,
    description: `Version 1 uses Mapillary panoramas to train an AI that guesses locations, displaying confidence regions and reaching a 90% prediction accuracy rate. Version 2 advances the work with a modified ResNet-50 computer vision architecture trained on 61,000 images, custom layers, and a Haversine distance-based loss function to identify locations across the United States despite seasonal and lighting changes.`
  },
  {
    title: 'Search Engine', languages: ['Python', 'MapReduce'], categories: ['Python', 'Web'], image: `${oldSite}/new_images/search_engine.jpeg`, href: `${oldSite}/485_p5`,
    description: `My team and I developed a scalable search engine similar to Google, using tf-idf for text analysis and PageRank for link analysis. We implemented a segmented inverted index through MapReduce programs, built a REST API for returning results, and designed the search interface. The project combined distributed systems, service-oriented architecture, parallel data processing, and full-stack development.`
  },
  {
    title: 'Instagram Clone', languages: ['Python', 'React', 'Flask', 'SQL'], categories: ['Python', 'Web'], image: `${oldSite}/new_images/instagram_clone.png`, href: `${oldSite}/instagram`, date: 'Winter 2024',
    description: `We created three versions of an Instagram clone: a static site, a dynamic server-rendered site, and a dynamic client-side application. The work progressed from HTML, Python, Jinja, and CSS templates to SQL, Flask, sessions, authentication, likes, comments, accounts, and posts. The final version used REST APIs, React, and JavaScript to eliminate hard reloads while adding infinite scroll and double-tap to like.`
  },
  {
    title: 'Computer Lab VR', languages: ['Unreal Engine 5', 'Jira'], categories: ['XR'], image: '', href: `${oldSite}/ComputerLabVR`, date: 'Winter 2025',
    description: `An interactive VR recreation of a room in the University of Michigan Bob and Betty Beyster Building. The environment lets visitors talk to NPCs and drive a racecar on a racetrack.`
  },
  {
    title: 'Assembly Linker', languages: ['C'], categories: ['C/C++', 'Assembly'], image: `${oldSite}/new_images/linker.png`, href: `${oldSite}/370_p2l`,
    description: `A linker that combines two to six assembly object files into a unified executable. It concatenates text and data segments, relocates symbolic addresses, resolves the special global Stack label, handles local labels, and detects duplicate globals, undefined labels, and invalid Stack definitions before generating machine code.`
  },
  {
    title: 'Assembly Simulator', languages: ['C'], categories: ['C/C++', 'Assembly'], image: `${oldSite}/new_images/simulator.png`, href: `${oldSite}/370_p1s`,
    description: `A behavioral simulator capable of running an assembly machine-code program. It reads generated machine code, initializes registers and the program counter, parses opcodes and operands, executes until halt, and correctly handles two's-complement 16-bit offsets for load, store, and branch instructions.`
  },
  {
    title: 'Machine Code Generator', languages: ['C'], categories: ['C/C++', 'Assembly'], image: `${oldSite}/new_images/binary.png`, href: `${oldSite}/370_p2a`,
    description: `An assembler that translates assembly into machine code while supporting external references. It distinguishes local and global labels and produces Header, Text, Data, Symbol, and Relocation sections. Validation covers undefined locals, invalid branch targets, duplicate labels, oversized offsets, unknown opcodes, and illegal registers.`
  },
  {
    title: 'Pipeline Simulator', languages: ['C'], categories: ['C/C++', 'Assembly'], image: `${oldSite}/new_images/processor.png`, href: `${oldSite}/370_p3`,
    description: `A cycle-accurate pipelined processor simulator with data forwarding and branch prediction. The implementation addresses data hazards through forwarding or targeted stalls and handles control hazards with predict-branch-not-taken behavior.`
  },
  {
    title: 'Cache Simulator', languages: ['C'], categories: ['C/C++', 'Assembly'], image: `${oldSite}/new_images/cache.png`, href: `${oldSite}/370_p4`,
    description: `A configurable CPU cache integrated into an assembly behavioral simulator. It supports write-back and allocate-on-write policies, direct-mapped through fully associative layouts, and configurable cache, block, and associativity parameters.`
  },
  {
    title: 'Bank Simulator', languages: ['C++'], categories: ['C/C++'], image: `${oldSite}/new_images/bank.jpg`, href: `${oldSite}/281_p3`,
    description: `An online banking infrastructure simulator that parses user registrations and command streams, manages login sessions, validates and schedules transactions with a priority queue, detects potentially fraudulent activity, and calculates fees and loyalty discounts. It also supports transaction, revenue, customer-history, and daily-summary queries.`
  },
  {
    title: 'MST & TSP Calculator', languages: ['C++'], categories: ['C/C++', 'Algorithms'], image: `${oldSite}/new_images/tsp.png`, href: `${oldSite}/281_p4`,
    description: `A graph toolkit with three modes: constructing a minimum spanning tree, quickly approximating a travelling salesperson route, and finding an optimal TSP route. It handles command-line modes, graph constraints, route order, and total-distance output.`
  },
  {
    title: 'Zombie Defense Game', languages: ['C++'], categories: ['C/C++', 'Algorithms'], image: `${oldSite}/new_images/zombie.png`, href: `${oldSite}/281_p2`,
    description: `A priority-queue-driven survival game in which the player targets zombies based on distance, speed, and health. It supports verbose logs, statistics, median calculations, standardized random generation, and detailed victory or defeat reports while demonstrating templates, inheritance, polymorphism, testing, and efficient algorithms.`
  },
  {
    title: '3-D Puzzle Solver', languages: ['C++'], categories: ['C/C++', 'Algorithms'], image: `${oldSite}/new_images/3-d.png`, href: `${oldSite}/281_p1`,
    description: `A command-line solver for layered 3-D maze puzzles. It validates maps, uses breadth-first or depth-first search based on runtime options, tracks position and button state, and outputs either a path list or annotated map while handling unsolvable inputs.`
  },
  {
    title: 'Image Resizing', languages: ['C++'], categories: ['C/C++', 'Algorithms'], image: `${oldSite}/assets/img/old_photos/side_code.jpeg`, href: `${oldSite}/image_resizing`,
    description: `A content-aware PNG resizer built with seam carving. The algorithm calculates pixel importance and removes the lowest-energy seams, preserving visually important parts of an image while reducing its dimensions.`
  },
  {
    title: 'Euchre Simulation', languages: ['C++'], categories: ['C/C++'], image: `${oldSite}/assets/img/old_photos/euchre.jpeg`, href: `${oldSite}/euchre`,
    description: `An object-oriented simulation of Michigan's classic card game using inheritance, polymorphism, and advanced data structures. Games can mix human and computer players, with automated players following a strategy algorithm to compete against the opposing team.`
  },
  {
    title: 'Piazza Post Sorter', languages: ['C++'], categories: ['C/C++', 'Machine Learning'], image: `${oldSite}/assets/img/old_photos/BST.png`, href: `${oldSite}/bst`,
    description: `A trained text classifier that sorts discussion posts into topics. It uses recursive methods and binary search trees, learning from labeled paragraphs and improving its ability to categorize new posts as the training set grows.`
  },
  {
    title: 'Calculating Rocket Payloads', languages: ['C++'], categories: ['C/C++', 'Optimization'], image: `${oldSite}/assets/img/old_photos/rockets.png`, href: `${oldSite}/rocket`,
    description: `A numerical toolkit using finite-difference methods to optimize rocket fuel loads for a payload, calculate maximum reachable altitude under gravity and air resistance, and binary-search for the ideal fuel mass needed to reach a target height.`
  },
  {
    title: 'Office Hours API', languages: ['Python', 'C++', 'HTML'], categories: ['Python', 'C/C++', 'Web'], image: `${oldSite}/assets/img/old_photos/search.jpeg`, href: `${oldSite}/office_hours_api`,
    description: `The back end for an online office-hours queue. Linked-list structures push and pull students while the API exposes GET, POST, and DELETE operations to keep the queue and its web interface synchronized.`
  },
  {
    title: 'K-means Machine Learning', languages: ['C++', 'MATLAB'], categories: ['C/C++', 'MATLAB', 'Machine Learning'], image: `${oldSite}/assets/img/old_photos/k-means_final.png`, href: `${oldSite}/k-means`,
    description: `A clustering analysis of vehicle datasets containing fuel economy, cylinder count, displacement, and other attributes. A k-means implementation interprets these features and organizes the vehicle models into three distinct groups.`
  },
  {
    title: 'Quantum Fault Tolerance Library', languages: ['Python', 'Qiskit'], categories: ['Python', 'Quantum'], image: `${oldSite}/new_images/quantum_comp.jpg`, href: `${oldSite}/498_p3`,
    description: `A subset of a fault-tolerant quantum circuit library centered on the Steane error-correction code. It corrects single-qubit errors, creates fault-tolerant X, Y, Z, H, S, T, and CNOT circuits, and decodes measurements into logical states for more reliable quantum computation.`
  },
  {
    title: 'Study Group Coordinator', languages: ['Python', 'Qiskit'], categories: ['Python', 'Quantum'], image: `${oldSite}/new_images/studygroup.jpeg`, href: `${oldSite}/498_p2`,
    description: `A quantum study-group scheduler that uses Grover's algorithm and quantum counting to satisfy constraints expressed in conjunctive normal form. It includes Bitflip and Phase Oracles, solution optimization, and a counting circuit for estimating the number of feasible groupings.`
  },
  {
    title: 'Tumor Detection', languages: ['MATLAB'], categories: ['MATLAB'], image: `${oldSite}/assets/img/old_photos/brain_final.png`, href: `${oldSite}/tumor_detection`,
    description: `A MATLAB model that locates brain tumors and calculates appropriate radiation-beam intensity for treatment, balancing target coverage with the surrounding tissue.`
  },
  {
    title: 'Maze Solver', languages: ['MATLAB'], categories: ['MATLAB', 'Algorithms'], image: `${oldSite}/assets/img/old_photos/maze.jpeg`, href: `${oldSite}/maze`,
    description: `A maze-solving algorithm that can find an exit without prior knowledge of the maze or visibility ahead. It records visited positions, avoids repeating paths, and backtracks only when every unexplored direction leads to a dead end.`
  },
  {
    title: 'Computing Alaskan Precipitation', languages: ['Julia'], categories: ['Julia', 'Data'], image: `${oldSite}/assets/img/old_photos/alaska.png`, href: `${oldSite}/calculating_Alaskan_precipitation`,
    description: `A Julia data-analysis project that processes environmental databases to generate a geographic map of average rainfall across Alaska.`
  },
  {
    title: 'Segway Optimization', languages: ['Julia'], categories: ['Julia', 'Optimization'], image: `${oldSite}/assets/img/old_photos/segway.jpeg`, href: `${oldSite}/segway`,
    description: `A control-systems project using matrix methods to regulate Segway speed and feedback response. The final model implements a model-predictive balance controller capable of recovering from sudden pushes.`
  },
  {
    title: 'Personal Website', languages: ['HTML', 'CSS', 'JavaScript'], categories: ['Web'], image: `${oldSite}/assets/img/old_photos/website_final.png`, href: `${oldSite}/website`,
    description: `The previous generation of this portfolio, developed iteratively after learning HTML, CSS, and JavaScript in University of Michigan courses SI 339 and EECS 201. It evolved through multiple redesigns and remains the source archive for this current site.`
  },
]

export const projectCategories = ['All', 'C/C++', 'Python', 'Web', 'Machine Learning', 'Assembly', 'MATLAB', 'Julia', 'Quantum', 'Algorithms', 'Optimization', 'XR']
