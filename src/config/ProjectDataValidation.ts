import Joi from 'joi';
import { GlowTypes, BlockTypes } from '../types';

const blockTypeList = [
  BlockTypes.DECISION_BLOCK,
  BlockTypes.STATEMENT_BLOCK,
  BlockTypes.LOAD_BLOCK,
  BlockTypes.STORE_BLOCK,
  BlockTypes.START_BLOCK,
  BlockTypes.STOP_BLOCK,
  BlockTypes.WHILE_LOOP_BLOCK,
];

const glowTypeList = [GlowTypes.NONE, GlowTypes.NORMAL, GlowTypes.ERROR];

export const BlockSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string()
    .valid(...blockTypeList)
    .required(),
  position: Joi.object({
    x: Joi.number().required(),
    y: Joi.number().required(),
  }).required(),
  text: Joi.string().allow('').required(),
  glow: Joi.string()
    .valid(...glowTypeList)
    .required(),
  name: Joi.string(),
  parentNodeId: Joi.string().allow(null).required(),
  width: Joi.number().required(),
  height: Joi.number().required(),
}).options({ allowUnknown: false });

export const EdgeSchema = Joi.object({
  id: Joi.string().required(),
  sourceId: Joi.string().required(),
  targetId: Joi.string().required(),
  sourceHandle: Joi.string().allow(null).required(),
  targetHandle: Joi.string().allow(null).required(),
}).options({ allowUnknown: false });

export const ProjectDataSchema = Joi.object({
  title: Joi.string().min(5).max(30).required(),
  inputParams: Joi.string().allow('').required(),
  blocks: Joi.array().items(BlockSchema).required(),
  connections: Joi.array().items(EdgeSchema).required(),
});
