const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String
        },
        created: {
            type: Date
        },
        address: {
            type: String
        },
        banner_image: {
            type: String
        },
        avatar_image: {
            type: String
        },
        twitter_url: {
            type: String
        },
        instagram_url: {
            type: String
        },
        discord_url: {
            type: String
        },
        telegram_url: {
            type: String
        },
        slug: {
            type: String
        },
        royalty: {
            type: Number
        },
        traits: {
            type: [Object],
            blackbox: true
        },
        assets: [
            {
                token_id: {
                    type: String,
                    required: true
                },
                name: {
                    type: String
                },
                image: {
                    type: String
                },
                mint_price: {
                    type: Number
                },
                mint_block: {
                    type: Number,
                },
                traits: [
                    {
                        trait_type: {
                            type: String
                        },
                        value: {
                            type: String
                        },
                        trait_count: {
                            type: Number
                        }
                    }
                ]
            }
        ],
        history: [
            {
                date: {
                    type: Date
                },
                one_volume: {
                    type: Number
                },
                one_change: {
                    type: Number
                },
                one_sales: {
                    type: Number
                },
                one_avg_price: {
                    type: Number
                },
                seven_volume: {
                    type: Number
                },
                seven_change: {
                    type: Number
                },
                seven_sales: {
                    type: Number
                },
                seven_avg_price: {
                    type: Number
                },
                thirty_volume: {
                    type: Number
                },
                thirty_change: {
                    type: Number
                },
                thirty_sales: {
                    type: Number
                },
                thiry_avg_price: {
                    type: Number
                },
                total_volume: {
                    type: Number
                },
                total_supply: {
                    type: Number
                },
                count: {
                    type: Number
                },
                num_owners: {
                    type: Number
                },
                avg_price: {
                    type: Number
                },
                floor_price: {
                    type: Number
                },
                market_cap: {
                    type: Number
                },
            }
        ]
    }
    ,
    {
        timestamps: true
    }
);

module.exports = mongoose.model('collection', CollectionSchema);
