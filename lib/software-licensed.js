'use babel';

import SoftwareLicenceView from './software-licence-view';
import { CompositeDisposable } from 'atom';
import path from 'path'

export default {

  softwareLicenceView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.softwareLicenceView = new SoftwareLicenceView(state.softwareLicenceViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.softwareLicenceView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'software-licence:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.softwareLicenceView.destroy();
  },

  serialize() {
    return {
      softwareLicenceViewState: this.softwareLicenceView.serialize()
    };
  },

  dodate() {
    let d = new Date()
    return d.getFullYear()
  },

  filename() {
    let activePane = atom.workspace.getActiveTextEditor()
      return activePane.getTitle()
  },

  mycontent() {
    return "/**\n"+
    "* [ " + this.filename() + " ].\n"+
    "*\n"+
    "* [Description of " + this.filename() +"]\n"+
    "*\n"+
    "* @author [Name] [<author@gmail.com>]\n"+
    "* @version 1.0.0\n"+
    "* @license The MIT License (MIT)\n"+
    "* @copyright Copyright (c) <"+ this.dodate() +"> <App Name>\n"+
    "* Permission is hereby granted, free of charge, to any person obtaining a copy\n"+
    "* of this software and associated documentation files (the \"Software\"), to deal\n"+
    "* in the Software without restriction, including without limitation the rights\n"+
    "* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n"+
    "* copies of the Software, and to permit persons to whom the Software is\n"+
    "* furnished to do so, subject to the following conditions:\n"+
    "* \n"+
    "* The above copyright notice and this permission notice shall be included in\n"+
    "* all copies or substantial portions of the Software.\n"+
    "* \n"+
    "* THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n"+
    "* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n"+
    "* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n"+
    "* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n"+
    "* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n"+
    "* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n"+
    "* THE SOFTWARE.\n"+
    "*/\n"
  },

  toggle() {
    //console.log('SoftwareLicence was toggled!');
    //
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.insertText(this.mycontent())
      atom.notifications.addSuccess(' ): [' + this.filename() + ' Software Licenced Successfully')
      //let selection = editor.getSelectedText()
      //let reversed  = selection.split('').reverse().join('')
      //editor.insertText(reversed)
    }
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
  }


};
