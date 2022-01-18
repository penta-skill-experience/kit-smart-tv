import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import config from '../config.json';


export interface AdminInput {
    password: string;
}

export interface AdminDocument extends AdminInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        default: () => `admin`,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

adminSchema.pre("save", async function (next){
    let admin = this as AdminDocument;

    if (!admin.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.saltWorkFactor);

    admin.password = bcrypt.hashSync(admin.password, salt);

    return next();
})

adminSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    const admin = this as AdminDocument;
    return bcrypt.compare(candidatePassword, admin.password).catch(() => false);
};

const AdminModel = mongoose.model<AdminDocument>("Admin", adminSchema);

export default AdminModel;