import { breadthFirstSearch, Point } from "./solution";


test("It finds the path for sample input", () => {
    const graph = [
        "Sabqponm","abcryxxl","accszExk","acctuvwj","abdefghi"]
    const start = {
        x: 0,
        y: 0
    };
    const end = {
        x: 2,
        y: 5
    };

    const result = breadthFirstSearch(graph, start, end);
    expect(result.length - 1).toEqual(31);

});

test("It finds the path for the real input", () => {
    const graph = [
        "abaaaaacaaaacccccccccaaaaaaccccccccccccccccccccccccccccccccccaaaaaa",
"abaaaaacaaaaccccaaaaaaaaaacccccccccccccccccccccccccccccccccccaaaaaa",
"abaaacccaaaaccccaaaaaaaaaaacccaacccccccccccaacccccccccccccccccaaaaa",
"abaaaacccaacccccaaaaaaaaaaaaaaaaacccccccccccacccccccccccccccccccaaa",
"abacaacccccccccccaaaaaaaaaaaaaaaaccccccccccaacccccccccccccccccccaaa",
"abcccacccccccccccaaaaaaaccaaaaaaaccccccccccclllcccccacccccccccccaac",
"abccccccccccccccccaaaaaccccccccccccccccccclllllllcccccccccccccccccc",
"abaaacccccccccccccaaaaaccccccccccccccccaakklllllllcccccccccaacccccc",
"abaaacccccccccccacccaaaccccccccccccccccakkklpppllllccddaaacaacccccc",
"abaaacccaaacccccaacaaaccccccccccccccccckkkkpppppllllcddddaaaacccccc",
"abaacccaaaacccccaaaaaccccccccccccccccckkkkpppppppllmmddddddaaaacccc",
"abaaaccaaaaccccccaaaaaacaaacccccccccckkkkpppuuuppplmmmmdddddaaacccc",
"abaaacccaaaccccaaaaaaaacaaaaccccccckkkkkoppuuuuuppqmmmmmmdddddacccc",
"abcccccccccccccaaaaaaaacaaaacccccjkkkkkooppuuuuuuqqqmmmmmmmddddcccc",
"abccccccccccccccccaaccccaaaccccjjjjkoooooouuuxuuuqqqqqqmmmmmddecccc",
"abacaaccccccccccccaacccccccccccjjjjoooooouuuxxxuvvqqqqqqqmmmeeecccc",
"abaaaacccccccacccaccccccccccccjjjjoootuuuuuuxxxyvvvvvqqqqmmmeeecccc",
"abaaaaacccccaaacaaacccccccccccjjjoooottuuuuuxxyyvvvvvvvqqmnneeecccc",
"abaaaaaccaaaaaaaaaaccccccccaccjjjooottttxxxxxxyyyyyyvvvqqnnneeecccc",
"abaaaccccaaaaaaaaaacccccccaaccjjjoootttxxxxxxxyyyyyyvvqqqnnneeecccc",
"SbcaaccccaaaaaaaaaaccccaaaaacajjjnnntttxxxxEzzzyyyyvvvrrqnnneeccccc",
"abcccccccaaaaaaaaaaacccaaaaaaaajjjnnntttxxxxyyyyyvvvvrrrnnneeeccccc",
"abcccccccaaaaaaaaaaacccccaaaaccjjjnnnnttttxxyyyyywvvrrrnnneeecccccc",
"abcccccccccaaaaaaccaccccaaaaaccciiinnnnttxxyyyyyyywwrrnnnneeecccccc",
"abccccccccccccaaacccccccaacaaaccciiinnnttxxyywwyyywwrrnnnffeccccccc",
"abccccccccccccaaacccccccaccaaaccciiinnnttwwwwwwwwwwwrrrnnfffccccccc",
"abccccccccccccccccccccccccccccccciiinnnttwwwwsswwwwwrrrnnfffccccccc",
"abaaaccaaccccccccccccccccccccccccciinnnttswwwssswwwwrrroofffacccccc",
"abaaccaaaaaacccccccccccccccccaaacciinnntssssssssssrrrrooofffacccccc",
"abaccccaaaaacccccccaaacccccccaaaaciinnnssssssmmssssrrrooofffacccccc",
"abaacaaaaaaacccccccaaaaccccccaaaaciiinmmmssmmmmmoosroooooffaaaacccc",
"abaaaaaaaaaaaccccccaaaaccccccaaacciiimmmmmmmmmmmoooooooofffaaaacccc",
"abcaaaaaaaaaaccccccaaaaccccccccccccihhmmmmmmmhggoooooooffffaaaccccc",
"abcccccaaacaccccccccaaccccccccccccchhhhhhhhhhhggggggggggffaaacccccc",
"abaccccaacccccccccccaaaccccccccccccchhhhhhhhhhgggggggggggcaaacccccc",
"abaaaccccaccccccccccaaaacccaacccccccchhhhhhhaaaaaggggggcccccccccccc",
"abaaaccccaaacaaaccccaaaacaaaacccccccccccccccaaaacccccccccccccccaaac",
"abaacccccaaaaaaaccccaaaaaaaaacccccccccccccccaaacccccccccccccccccaaa",
"abaaaccccaaaaaaccccaaaaaaaaccccccccccccccccccaacccccccccccccccccaaa",
"abccccccaaaaaaaaaaaaaaaaaaacccccccccccccccccaaccccccccccccccccaaaaa",
"abcccccaaaaaaaaaaaaaaaaaaaaacccccccccccccccccccccccccccccccccaaaaaa"]
    const start = {
        x: 20,
        y: 0
    };
    const end = {
        x: 20,
        y: 43
    };

    const result = breadthFirstSearch(graph, start, end);
    expect(result.length - 1).toEqual(31);

});