def clockwise(p1, p2, p3):
	(x1, y1), (x2, y2), (x3, y3) = p1, p2, p3
	return ((x2-x1)*(y3-y1)) - ((y2-y1)*(x3-x1)) > 0

def convexhull(points):
	points = sorted(points)
	upperHull = [points[0], points[1]]
	lowerHull = [points[-1], points[-2]]

	for i in range(len(points) - 2, -1, -1):
			while len(lowerHull) > 1 and not clockwise(points[i], lowerHull[-1], lowerHull[-2]):
				lowerHull.pop()
			lowerHull.append(points[i])

	for i in range(2, len(points)):
		while len(upperHull) > 1 and not clockwise(points[i], upperHull[-1], upperHull[-2]):
			upperHull.pop()
		upperHull.append(points[i])
	convex_hull = upperHull + lowerHull[1:-1]
	convex_hull = convex_hull[::-1]
	if convex_hull[0] == convex_hull[-1]:
		convex_hull = convex_hull[1:]
	return convex_hull