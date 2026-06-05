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
print(f"v1={v1}, v2={v2}")
print(f"v1+v2={v1+v2}")
print(f"v1*3={v1*3}")
print(f"|v1|={v1.magnitude():.3f}")
