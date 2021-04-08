# 0.64
# 0.24
# 0.32
import random
import numpy
def sequence1():
    list1 = []
    for i in range(0,25):
        val = numpy.random.choice(numpy.arange(0, 2), p=[0.64, 0.36])
        list1.append(val)
    return list1

def sequence2():
    list2 = []
    for i in range(0,25):
        val = numpy.random.choice(numpy.arange(0, 6), p=[0.152, 0.152, 0.152, 0.152, 0.152, 0.24])
        list2.append(val)
    return list2

def sequence3():
    list3 = []
    for i in range(0,25):
        val = numpy.random.choice(numpy.arange(0, 2), p=[0.34, 0.66])
        list3.append(val)
    return list3

sq1 = sequence1()
while sq1.count(0) != 16:
    sq1 = sequence1()
print(sq1)

sq2 = sequence2()
while sq2.count(5) != 6:
    sq2 = sequence2()
print(sq2)

sq3a = sequence3()
sq3asub = sq3a[:13]
while sq3a.count(0) != 8 or sq3asub.count(0) != 2:
    sq3a = sequence3()
    sq3asub = sq3a[:13]
print(sq3a)

sq3b = sequence3()
sq3bsub = sq3b[:13]
while sq3b.count(0) != 8 or sq3bsub.count(0) != 6:
    sq3b = sequence3()
    sq3bsub = sq3b[:13]
print(sq3b)