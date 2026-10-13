# Quote email format (FormSubmit, "Form version: quote-v3")

Every quote request email is a table of label/value rows in this exact order. Blank values are sent as `N/A`.

## Item 1 and the request (the original 28 labels, unchanged)
1. Form version (`quote-v3`; v3 added Item count and the Item N rows)
2. Product code (slug, e.g. `pull-up-banners`, `corflute-signs`, `other`)
3. Product
4. Item
5. Size
6. Custom size (as entered)
7. Size (mm) (`W x H`, whole mm)
8. Material
9. Orientation
10. Thickness
11. Sides
12. Eyelets
13. Options (`Key: value; Key: value`, e.g. `Stand: Luxury pull up banner; Base colour: Silver`)
14. Quantity
15. Number of designs
16. Price shown (corflute: `$X each, $Y total for N signs`, matching the quantity tier)
17. Name
18. Email
19. Phone
20. Business
21. Delivery suburb
22. Delivery state
23. Delivery postcode
24. Needed by
25. Artwork status
26. Artwork link
27. Artwork check
28. Notes

## Then
29. Item count (`1` to `5`; always present)

## Items 2 to 5 (only the items that exist, in order)
For each N from 2 to Item count, these 14 rows, each label prefixed with `Item N – ` (en dash, spaces either side):

`Item N – Product code`, `Item N – Product`, `Item N – Size`, `Item N – Custom size (as entered)`,
`Item N – Size (mm)`, `Item N – Material`, `Item N – Orientation`, `Item N – Thickness`, `Item N – Sides`,
`Item N – Eyelets`, `Item N – Options`, `Item N – Quantity`, `Item N – Number of designs`, `Item N – Price shown`

They mean the same as item 1's labels. Contact, delivery, artwork and notes are shared by the whole request
(item 1's rows). The subject reads `New quote request – <Name> – <Product> + N more` when there are extra items.
