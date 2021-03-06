import Joi from 'joi';
import { titleRegex } from '../components/project-title/ProjectTitle.service';
import { BlockTypes } from '../types';

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
    .valid(...Object.values(BlockTypes))
    .required(),
  position: Joi.object({
    x: Joi.number().required(),
    y: Joi.number().required(),
  }).required(),
  text: Joi.string().allow('').required(),
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
