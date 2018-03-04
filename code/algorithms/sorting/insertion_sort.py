def insertion_sort(l):
	for i in range(len(l)):
		to_place = l[i]
		pos = i - 1
		while 0 < pos and l[pos] > to_place:
			l[pos + 1] = l[pos]
			pos -= 1
		l[pos] = to_place
	return l