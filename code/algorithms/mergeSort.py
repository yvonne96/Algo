def mergeSort(l):
	if len(l) == 1:
		return l
	mid = len(l) // 2
	l1 = mergeSort(l[:mid])
	l2 = mergeSort(l[mid:])
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