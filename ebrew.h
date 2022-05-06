#include <stddef.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
size_t ebz_putchar(size_t c)
{
    putchar((int)c);
    return 0;
}
size_t ebz_pair(size_t a, size_t b)
{
    size_t *r = malloc(sizeof(size_t) * 2);
    r[0] = a;
    r[1] = b;
    return (size_t)r;
}
size_t ebz_first(size_t p) { return ((size_t *)p)[0]; }
size_t ebz_second(size_t p) { return ((size_t *)p)[1]; }
size_t ebz_if(size_t c, size_t t, size_t e)
{
    size_t f = c ? t : e;
    return ((size_t(*)(size_t)) * (size_t *)f)(f);
}
size_t eb_putchar(size_t a1, size_t a2) { return ebz_putchar(a2); }
size_t eb_pair(size_t a1, size_t a2, size_t a3) { return ebz_pair(a2, a3); }
size_t eb_first(size_t a1, size_t a2) { return ebz_first(a2); }
size_t eb_second(size_t a1, size_t a2) { return ebz_second(a2); }
size_t eb_if(size_t a1, size_t a2, size_t a3, size_t a4) { return ebz_if(a2, a3, a4); }
size_t eb_add(size_t a1, size_t r, size_t l) { return l + r; }
size_t eb_sub(size_t a1, size_t r, size_t l) { return l - r; }
size_t eb_mul(size_t a1, size_t r, size_t l) { return l * r; }
size_t eb_div(size_t a1, size_t r, size_t l) { return l / r; }
size_t eb_mod(size_t a1, size_t r, size_t l) { return l % r; }
size_t eb_equal(size_t a1, size_t r, size_t l) { return l == r ? 1 : 0; }
size_t eb_above(size_t a1, size_t r, size_t l) { return r > l ? 1 : 0; }
size_t ebz_stol(char *p)
{
    size_t r = 0;
    for (size_t i = strlen(p); i > 0; i--)
    {
        r = ebz_pair(p[i - 1], r);
    };
    return r;
}
size_t eb_read_DASH_file(size_t a1, size_t f)
{
    char name[1024];
    char *s = name;
    while (f)
    {
        *s++ = ebz_first(f);
        f = ebz_second(f);
    }
    *s++ = 0;
    FILE *k = fopen(name, "r");
    char *i = malloc(1 << 20);
    char *m = i;
    while (!feof(k))
    {
        char c = fgetc(k);
        if (c <= 0)
        {
            break;
        }
        *m++ = c;
    }
    *m++ = 0;
    fclose(k);
    size_t r = ebz_stol(i);
    free(i);
    return r;
}
size_t *ebz_alloc_mem = (void *)0;
size_t ebz_alloc_head = 0;
size_t ebz_alloc_alloc = 0;
void *ebz_alloc(size_t n)
{
    size_t head = ebz_alloc_head;
    ebz_alloc_head += n;
    if (ebz_alloc_head >= ebz_alloc_alloc) {
        ebz_alloc_alloc = ebz_alloc_head * 4 + (1 << 12);
        ebz_alloc_mem = malloc(sizeof(size_t) * ebz_alloc_alloc);
    }
    return &ebz_alloc_mem[head];
}
size_t ebz_alloc_get_size(void) {
    return ebz_alloc_head;
}
void ebz_alloc_set_size(size_t n) {
    // ebz_alloc_head = n;
}
size_t eb_main(size_t c, size_t a1);
int main(int argc, char **argv)
{
    size_t a = 0;
    while (argc > 1)
    {
        char *c = argv[--argc];
        a = ebz_pair(ebz_stol(c), a);
    }
    return (int)eb_main(0, a);
}
