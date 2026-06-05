from functools import reduce, lru_cache
from itertools import groupby, islice
from collections import Counter
import random
import time

print("=" * 60)
print("         Claude's Python Showcase")
print("=" * 60)

# ── 1. 피보나치 (재귀 + 메모이제이션) ──────────────────────────
@lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

fibs = [fib(i) for i in range(15)]
print(f"\n[1] 피보나치 수열: {fibs}")

# ── 2. 원라이너 소수 판별기 ────────────────────────────────────
is_prime = lambda n: n > 1 and all(n % i for i in range(2, int(n**0.5) + 1))
primes = list(filter(is_prime, range(2, 80)))
print(f"[2] 80 이하 소수:  {primes}")

# ── 3. 리스트 컴프리헨션 + 행렬 전치 ──────────────────────────
matrix = [[i * 4 + j + 1 for j in range(4)] for i in range(4)]
transposed = [[row[i] for row in matrix] for i in range(4)]
print(f"[3] 원본 행렬:\n    {matrix}")
print(f"    전치 행렬:\n    {transposed}")

# ── 4. 제너레이터로 무한 스트림 처리 ──────────────────────────
def infinite_counter(start=0):
    while True:
        yield start
        start += 1

first_10_squares = [x**2 for x in islice(infinite_counter(1), 10)]
print(f"[4] 1~10 제곱:    {first_10_squares}")

# ── 5. 클로저 + 데코레이터 ─────────────────────────────────────
def timer(func):
    def wrapper(*args, **kwargs):
        t = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"    실행 시간: {(time.perf_counter() - t) * 1000:.3f}ms")
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
print(f"\n[5] 버블 정렬")
print(f"    입력: {data}")
sorted_data = bubble_sort(data)
print(f"    결과: {sorted_data}")

# ── 6. 딕셔너리 컴프리헨션 + Counter ──────────────────────────
sentence = "the quick brown fox jumps over the lazy dog"
freq = Counter(sentence.split())
top5 = dict(sorted(freq.items(), key=lambda x: -x[1])[:5])
print(f"\n[6] 단어 빈도 Top5: {top5}")

# ── 7. map / filter / reduce 함수형 파이프라인 ─────────────────
nums = range(1, 11)
result = reduce(
    lambda acc, x: acc + x,
    filter(lambda x: x % 2 == 0,
    map(lambda x: x ** 2, nums))
)
print(f"[7] 1~10 짝수 제곱합: {result}")

# ── 8. 클래스 + __magic__ 메서드 ──────────────────────────────
class Vector:
    def __init__(self, *components):
        self.v = list(components)

    def __add__(self, other):
        return Vector(*[a + b for a, b in zip(self.v, other.v)])

    def __mul__(self, scalar):
        return Vector(*[x * scalar for x in self.v])

    def magnitude(self):
        return sum(x**2 for x in self.v) ** 0.5

    def __repr__(self):
        return f"Vector{tuple(self.v)}"

v1, v2 = Vector(1, 2, 3), Vector(4, 5, 6)
print(f"\n[8] 벡터 연산")
print(f"    v1={v1}, v2={v2}")
print(f"    v1+v2={v1+v2}, v1*3={v1*3}, |v1|={v1.magnitude():.3f}")

# ── 9. itertools.groupby로 연속 그루핑 ────────────────────────
seq = [1, 1, 2, 2, 2, 3, 1, 1, 4, 4]
grouped = [(k, list(g)) for k, g in groupby(seq)]
print(f"\n[9] 연속 그루핑: {grouped}")

# ── 10. 재귀 퀵정렬 (한눈에 보이는 구조) ──────────────────────
quicksort = lambda lst: (
    [] if not lst else
    quicksort([x for x in lst[1:] if x <= lst[0]])
    + [lst[0]]
    + quicksort([x for x in lst[1:] if x > lst[0]])
)
sample = random.sample(range(50), 10)
print(f"[10] 퀵정렬: {sample} → {quicksort(sample)}")

print("\n" + "=" * 60)
print("       Done. 감탄하셨나요? 😎")
print("=" * 60)
