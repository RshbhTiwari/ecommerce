
const ProductsData = [
    {
        id: 1,
        price: 500,
        discount_price: 200,

        is_variant: "true",
        variant_name: [
            { id: 1, variant: "size" },
            { id: 2, variant: "waight" }],

        variant_value: [
            {
                id: 1,
                multiple_values: [
                    {
                        id: 1,
                        size: "100pc",
                        prize: 500,
                        discount_price: 200,
                    },
                    {
                        id: 2,
                        size: "500gm",
                        prize: 1000,
                        discount_price: 800,
                    }
                ],
                variant: "size"
            },

            {
                id: 2,
                multiple_values: [
                    {
                        id: 1,
                        size: "1kg",
                        prize: 500,
                        discount_price: 200,
                    },
                    {
                        id: 2,
                        size: "2kg",
                        prize: 1000,
                        discount_price: 800,
                    }
                ],
                variant: "waight"
            },

        ]
    },

    {
        id: 2,
        price: 500,
        discount_price: 200,
        is_variant: "true",
        variant_name: [
            { id: 1, variant: "size" },
            { id: 2, variant: "waight" }],

        variant_value: [
            {
                id: 1,
                multiple_values: [
                    {
                        id: 1,
                        size: "100pc",
                        prize: 500,
                        discount_price: 200,
                    },
                    {
                        id: 2,
                        size: "500gm",
                        prize: 1000,
                        discount_price: 800,
                    }
                ],
                variant: "size"
            },

            {
                id: 2,
                multiple_values: [
                    {
                        id: 1,
                        size: "1kg",
                        prize: 500,
                        discount_price: 200,
                    },
                    {
                        id: 2,
                        size: "2kg",
                        prize: 1000,
                        discount_price: 800,
                    }
                ],
                variant: "waight"
            },

        ]
    }
];

export default ProductsData;