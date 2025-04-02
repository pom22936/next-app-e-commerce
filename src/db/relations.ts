import { relations } from "drizzle-orm/relations";
import { user, account, product, productImage, session } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
    user: one(user, {
        fields: [account.userId],
        references: [user.id]
    }),
}));

export const userRelations = relations(user, ({many}) => ({
    accounts: many(account),
    sessions: many(session),
}));

export const productImageRelations = relations(productImage, ({one}) => ({
    product: one(product, {
        fields: [productImage.productId],
        references: [product.id]
    }),
}));

export const productRelations = relations(product, ({many}) => ({
    productImages: many(productImage),
}));

export const sessionRelations = relations(session, ({one}) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id]
    }),
}));