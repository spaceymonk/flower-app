import Joi from 'joi';
import { titleRegex } from '../components/project-title/ProjectTitle.service';
import { GlowTypes, BlockTypes } from '../types';

const blockTypeList = [
  BlockTypes.DECISION_BLOCK,
  BlockTypes.STATEMENT_BLOCK,
  BlockTypes.LOAD_BLOCK,
  BlockTypes.STORE_BLOCK,
  BlockTypes.START_BLOCK,
  BlockTypes.STOP_BLOCK,
  BlockTypes.WHILE_LOOP_BLOCK,
  BlockTypes.FUNCTION_BLOCK,
];

const glowTypeList = [GlowTypes.NONE, GlowTypes.NORMAL, GlowTypes.ERROR];

export const EdgeSchema = Joi.object({
  id: Joi.string().required(),
  sourceId: Joi.string().required(),
  targetId: Joi.string().required(),
  sourceHandle: Joi.string().allow(null).required(),
  targetHandle: Joi.string().allow(null).required(),
})
  .options({ allowUnknown: false })
  .id('EdgeSchema');

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
  subroutine: Joi.link('#ProjectDataSchema').allow(null),
})
  .options({ allowUnknown: false })
  .id('BlockSchema');

export const ProjectDataSchema = Joi.object({
  title: Joi.string().regex(titleRegex).required(),
  inputParams: Joi.string().allow('').required(),
  blocks: Joi.array().items(BlockSchema).required(),
  connections: Joi.array().items(EdgeSchema).required(),
})
  .options({ allowUnknown: false })
  .id('ProjectDataSchema');
