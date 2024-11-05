import { camelize } from '@vue/shared'
import { isElementNode } from '../../../vite'
import { createAttributeNode } from '../../utils'
import {
  type AttributeNode,
  type DirectiveNode,
  NodeTypes,
  type RootNode,
  type TemplateChildNode,
  type TransformContext,
  isStaticExp,
} from '@vue/compiler-core'

export interface TransformMPBuiltInTagOptions {
  propRename?: Record<string, Record<string, string>>
  propAdd?: Record<
    string,
    {
      name: string
      value: string
    }[]
  >
  tagRename?: Record<string, string>
}

export const defaultTransformMPBuiltInTagOptions: TransformMPBuiltInTagOptions =
  {
    propRename: {
      checkbox: {
        // "backgroundColor": "",
        // "borderColor": "",
        // "activeBackgroundColor": "",
        // "activeBorderColor": "",
        foreColor: 'color',
      },
      radio: {
        // "backgroundColor": "",
        // "borderColor": "",
        activeBackgroundColor: 'color',
        // "activeBorderColor": "",
        // "foreColor": ""
      },
      slider: {
        backgroundColor: 'backgroundColor',
        activeBackgroundColor: 'activeColor',
        foreColor: 'block-color',
      },
      switch: {
        // "backgroundColor": "",
        activeBackgroundColor: 'color',
        // "foreColor": "",
        // "activeForeColor": ""
      },
    },
    propAdd: {
      canvas: [
        {
          name: 'type',
          value: '2d',
        },
      ],
    },
    tagRename: {
      'list-view': 'scroll-view',
    },
  }

function isPropNameMatch(
  prop: AttributeNode | DirectiveNode,
  name: string
): boolean {
  if (prop.type === NodeTypes.ATTRIBUTE) {
    const propName = camelize(prop.name)
    return propName === name
  } else if (prop.type === NodeTypes.DIRECTIVE && prop.rawName) {
    const propName = camelize(prop.rawName.slice(1))
    return propName === name
  }
  return false
}

export function createMPBuiltInTagTransform(
  options: TransformMPBuiltInTagOptions
) {
  return function (
    node: RootNode | TemplateChildNode,
    context: TransformContext
  ) {
    if (!isElementNode(node)) {
      return
    }
    if (options.propRename && node.tag in options.propRename) {
      const propMap = options.propRename[node.tag]
      node.props.forEach((prop) => {
        if (prop.type === NodeTypes.ATTRIBUTE) {
          const propName = camelize(prop.name)
          if (propName in propMap && propMap[propName]) {
            prop.name = propMap[propName]
          }
        } else if (prop.type === NodeTypes.DIRECTIVE) {
          if (!prop.rawName || !prop.arg || !isStaticExp(prop.arg)) {
            return
          }
          const propName = camelize(prop.rawName.slice(1))
          if (propName in propMap && propMap[propName]) {
            prop.rawName = ':' + propMap[propName]
            prop.arg.content = propMap[propName]
          }
        }
      })
    }
    if (options.propAdd && node.tag in options.propAdd) {
      const add = options.propAdd[node.tag]
      add.forEach(({ name, value }) => {
        if (node.props.some((item) => isPropNameMatch(item, name))) {
          return
        }
        node.props.push(createAttributeNode(name, value))
      })
    }
    if (options.tagRename && node.tag in options.tagRename) {
      node.tag = options.tagRename[node.tag]
    }
  }
}

export const transformMPBuiltInTag = createMPBuiltInTagTransform(
  defaultTransformMPBuiltInTagOptions
)
