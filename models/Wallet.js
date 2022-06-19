const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema(
    {
        address: {
            type: String
        },
        transactions: [
            {
                action: {
                    type: String
                },
                name: {
                    type: String
                },
                image: {
                    type: String
                },
                count: {
                    type: Number,
                    default: 1
                },
                value: {
                    type: Number,
                    default: 0
                },
                total_fee: {
                    type: Number,
                    default: 0
                },
                gas_fee: {
                    type: Number,
                    default: 0
                },
                creator_fee: {
                    type: Number,
                    default: 0
                },
                market_fee: {
                    type: Number,
                    default: 0
                },
                net: {
                    type: Number,
                    default: 0
                },
                pl: {
                    type: Number,
                    default: 0
                },
                hash: {
                    type: String
                },
                block: {
                    type: Number,
                    default: 0
                },
                date: {
                    type: Date
                },
                timestamp: {
                    type: Number,
                    default: 0
                },
                from: {
                    type: String
                },
                to: {
                    type: String
                },
                contract: {
                    type: String
                },
                token_id: {
                    type: String
                },
                collapse: [
                    {
                        name: {
                            type: String
                        },
                        image: {
                            type: String
                        },
                        value: {
                            type: Number,
                            default: 0
                        },
                        token_id: {
                            type: String
                        },
                        type: {
                            type: String
                        },
                        from: {
                            type: String
                        },
                        to: {
                            type: String
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
                close_pl: {
                    type: Number
                },
                open_pl: {
                    type: Number
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('wallet', WalletSchema);
