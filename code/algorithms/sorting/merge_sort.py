def merge_sort(l):
	if len(l) <= 1:
		return l
	mid = len(l) // 2
	l1 = merge_sort(l[:mid])
	l2 = merge_sort(l[mid:])
	new = []
	i, j = 0, 0
	while i < len(l1) and j < len(l2):
		if l1[i] < l2[j]:
			new.append(l1[i])
			i += 1
		else:
			new.append(l2[j])
			j += 1
	new += l1[i:]
	new += l2[j:]
	return new