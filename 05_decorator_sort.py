import time
import random

def timer(func):
    def wrapper(*args, **kwargs):
        t = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"실행 시간: {(time.perf_counter() - t) * 1000:.3f}ms")
        return result
    return wrapper

@timer
def bubble_sort(arr):
    arr = arr[:]
    for i in range(len(arr)):
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

data = random.sample(range(100), 15)
print(f"입력: {data}")
sorted_data = bubble_sort(data)
print(f"결과: {sorted_data}")
