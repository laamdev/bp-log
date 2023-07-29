import { InferModel } from "drizzle-orm"
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const measures = pgTable("measures", {
  id: serial("id").primaryKey().notNull(),
  userId: text("userId").notNull(),
  sys: integer("sys").notNull(),
  dia: integer("dia").notNull(),
  pp: integer("pp").notNull(),
  pul: integer("pul").notNull(),
  af: boolean("af"),
  measureTime: timestamp("measureTime", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  createdAt: timestamp("createdAt", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
})

export type Measure = InferModel<typeof measures>
export type NewMeasure = InferModel<typeof measures, "insert">
