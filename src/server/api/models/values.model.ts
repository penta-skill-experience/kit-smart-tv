import * as mongoose from "mongoose";

export interface ValuesInput {
    fontSizes: {
        id: string;
        name: string;
        titleFontSize: number;
        bodyFontSize: number;
        specialFontSize: number;
        specialFontSizeAccent: number,
    }[];
    colorSchemes: {
        id: string;
        name: string;
        titleColor: string;
        bodyColor: string;
        specialBoldColor: string;
        specialSubtleColor: string;
        accentBarColor: string;
        backgrounds: {
            id: string;
            url: string;
        }[];
    }[] ;
}

export interface ValuesDocument extends ValuesInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const ValuesSchema = new mongoose.Schema({
    fontSizes: {
        type: [new mongoose.Schema({
            id: {
                type: String,
                required: true,
                unique: true,
            },
            name: {
                type: String,
                required: true,
                unique: true,
            },
            titleFontSize: {
                type: Number,
                required: true,
            },
            bodyFontSize: {
                type: Number,
                required: true,
            },
            specialFontSize: {
                type: Number,
                required: true,
            },
            specialFontSizeAccent: {
                type: Number,
                required: true,
            },
        })],
        required: true,
    },
    colorSchemes: {
        type: [new mongoose.Schema({
            id: {
                type: String,
                required: true,
                unique: true,
            },
            name: {
                type: String,
                required: true,
                unique: true,
            },
            titleColor: {
                type: String,
                required: true,
            },
            bodyColor: {
                type: String,
                required: true,
            },
            specialBoldColor: {
                type: String,
                required: true,
            },
            specialSubtleColor: {
                type: String,
                required: true,
            },
            accentBarColor: {
                type: String,
                required: true,
            },
            backgrounds: {
                type: [new mongoose.Schema({
                    id: {
                        type: String,
                        required: true,
                        unique: true,
                    },
                    url: {
                        type: String,
                        required: true,
                    }
                })],
                required: true,
            },
        })],
        required: true,
    },
}, {timestamps: true});

export const ValuesModel = mongoose.model<ValuesDocument>("Values", ValuesSchema);