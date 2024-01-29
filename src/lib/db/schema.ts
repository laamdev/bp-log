import { InferInsertModel, InferSelectModel } from "drizzle-orm"
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const MeasuresTable = pgTable("measures", {
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
  cuffLocation: text("cuffLocation").notNull(),
  bodyPosition: text("bodyPosition").notNull(),
  createdAt: timestamp("createdAt", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
})

export type Measure = InferSelectModel<typeof MeasuresTable>
export type NewMeasure = InferInsertModel<typeof MeasuresTable>

export const MedicationsTable = pgTable("medications", {
  id: serial("id").primaryKey().notNull(),
  userId: text("userId").notNull(),
  name: text("name").notNull(),
  dose: integer("dose").notNull(),
  unit: text("unit").notNull(),
  time: text("time").notNull(),
  note: text("note"),
})

export type Medication = InferSelectModel<typeof MedicationsTable>
export type NewMedication = InferInsertModel<typeof MedicationsTable>
