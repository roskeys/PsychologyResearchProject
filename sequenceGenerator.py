# 0.625
# 0.4
# 0.3
import random
import numpy
list1 = []
for i in range(0,25):
    val = numpy.random.choice(numpy.arange(0, 2), p=[0.625, 0.375])
    list1.append(val)
print(list1)

list2 = []
for i in range(0,25):
    val = numpy.random.choice(numpy.arange(1, 7), p=[0.12, 0.12, 0.12, 0.12, 0.12, 0.4])
    list2.append(val)
print(list2)

list3 = []
for i in range(0,25):
    val = numpy.random.choice(numpy.arange(0, 2), p=[0.3, 0.7])
    list3.append(val)
print(list3)

