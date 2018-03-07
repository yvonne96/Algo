class Edge:
	def __init__(self, u, v):
		self.u = u
		self.v = v
		self.matched = False

def find_path(network, n, pointMatched, startPoint):
	for i in range(1, n + 1):
		if not startPoint[i]:
			current = i
			to_check = []
			for edge in network[current]:
				if not edge.matched:
					to_check.append(([edge]))
			while to_check:
				current = to_check.pop(0)
				prev = current[-1]
				if len(current) % 2 != 0 and not pointMatched[prev.v - 1]:
					pointMatched[prev.v - 1] = True
					return current

				for edge in network[prev.v]:
					if edge.v != prev.u and edge not in current and ((len(current) % 2 == 0 and not edge.matched) or (len(current) % 2 != 0 and edge.matched)):
						to_check.append((current + [edge]))
	return

def calculate_max_matching(network, n, pointMatched, startPoint):
	mf = 0
	path = True
	while path:
		path = find_path(network, n, pointMatched, startPoint)
		if path:
			mf += 1
			startPoint[path[0].u] = True
			for edge in path:
				edge.matched = not edge.matched
				edge.r.matched = not edge.r.matched
	return mf