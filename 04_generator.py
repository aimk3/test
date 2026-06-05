from itertools import islice

def infinite_counter(start=0):
    while True:
        yield start
        start += 1

first_10_squares = [x**2 for x in islice(infinite_counter(1), 10)]
print(f"1~10 제곱: {first_10_squares}")
