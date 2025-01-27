interface Route {
  origin: string;
  destination: string;
  price: number;
}

interface Path {
  route: string[];
  cost: number;
}

export function findBestRoute(
  routes: Route[],
  start: string,
  end: string
): Path | null {
  const graph = new Map<string, Map<string, number>>();

  // Build adjacency list
  for (const route of routes) {
    if (!graph.has(route.origin)) {
      graph.set(route.origin, new Map());
    }
    graph.get(route.origin)!.set(route.destination, route.price);
  }

  // Priority queue for Dijkstra's algorithm
  const pq: { vertex: string; cost: number; path: string[] }[] = [];
  const visited = new Set<string>();
  
  pq.push({ vertex: start, cost: 0, path: [start] });

  while (pq.length > 0) {
    // Get the path with lowest cost
    pq.sort((a, b) => a.cost - b.cost);
    const { vertex, cost, path } = pq.shift()!;

    if (vertex === end) {
      return { route: path, cost };
    }

    if (visited.has(vertex)) continue;
    visited.add(vertex);

    const neighbors = graph.get(vertex);
    if (!neighbors) continue;

    for (const [next, price] of neighbors) {
      if (!visited.has(next)) {
        pq.push({
          vertex: next,
          cost: cost + price,
          path: [...path, next]
        });
      }
    }
  }

  return null;
}