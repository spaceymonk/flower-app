import Joi from 'joi';
import { MarkerType } from 'react-flow-renderer';
import { GlowTypes, BlockTypes, EdgeTypes } from '../types';

const blockTypeList = [
  BlockTypes.DECISION_BLOCK,
  BlockTypes.STATEMENT_BLOCK,
  BlockTypes.LOAD_BLOCK,
  BlockTypes.STORE_BLOCK,
  BlockTypes.START_BLOCK,
  BlockTypes.STOP_BLOCK,
  BlockTypes.WHILE_LOOP_BLOCK,
];

const edgeTypeList = [EdgeTypes.CUSTOM_EDGE];

const glowTypeList = [GlowTypes.NONE, GlowTypes.NORMAL, GlowTypes.ERROR];

export const BlockSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string().valid(blockTypeList).required(),
  position: Joi.object({
    x: Joi.number().required(),
    y: Joi.number().required(),
  }).required(),
  data: Joi.object({
    text: Joi.string().allow(''),
    glow: Joi.string().valid(glowTypeList),
    width: Joi.number(),
    height: Joi.number(),
  }).required(),
});

export const EdgeSchema = Joi.object({
  id: Joi.string().required(),
  source: Joi.string().required(),
  target: Joi.string().required(),
  sourceHandle: Joi.string().allow(null).required(),
  targetHandle: Joi.string().allow(null).required(),
  type: Joi.string().valid(edgeTypeList).required(),
  markerEnd: Joi.object({
    type: Joi.string().valid(MarkerType.ArrowClosed).required(),
    color: Joi.string().valid(['#505050']).required(),
  }).required(),
});

export const ProjectDataSchema = Joi.object({
  title: Joi.string().required(),
  inputParams: Joi.string().required(),
  blocks: Joi.array().items(BlockSchema).required(),
  edges: Joi.array().items(EdgeSchema).required(),
});
