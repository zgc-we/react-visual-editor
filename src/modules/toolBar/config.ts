/**
 * 工具栏配置
 */
export default [{
  span: 8,
  style: { justifyContent: 'flex-end' },
  group: [
    { title: '撤销', icon: 'undo', event: 'undo' },
    { title: '重做', icon: 'redo', event: 'redo' },
    // {title:'属性重做',icon:'shuxing',event:'resetProps'},
    { title: '样式重做', icon: 'form', event: 'resetStyle' },
  ],
}, {
  span: 8,
  style: { justifyContent: 'flex-end' },
  group: [
    { title: '预览', icon: 'eye', event: 'previewPage' },
    { title: '导出代码', icon: 'export', event: 'outputFiles' },
    { title: '生成复合组件', icon: 'block', event: 'generateCompositeComponents' },


  ],
}, {
  span: 8,
  style: { justifyContent: 'flex-end', paddingRight: '50px' },
  group: [
    { title: '保存', icon: 'save', event: 'saveComponentsInfo' },
    { title: '复制', icon: 'copy', event: 'copyComponent' },
    { title: '清除', icon: 'rest', event: 'clearChildNodes' },
    { title: '删除', icon: 'delete', event: 'deleteComponent' },

  ],
}];


export const ENABLED = {
  selected: ['复制', '清除', '删除', '生成复合组件'],
  must: ['预览', '保存', '导出代码'],
};

export const DefaultImgBase64 = 'data:image/png;base64,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';