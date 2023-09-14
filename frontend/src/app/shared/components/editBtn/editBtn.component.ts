import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-btn',
  templateUrl: './editBtn.component.html',
  styleUrls: ['./editBtn.component.scss']
})
export class EditBtnComponent {
  private _goToEdit: boolean = false;
  title: string = 'Editar';

  @Input()
  set goToEdit(value: boolean) {
    this._goToEdit = value;
    this.updateTitle(); // Chame a função sempre que o valor de goToEdit for alterado.
  }

  get goToEdit(): boolean {
    return this._goToEdit;
  }

  updateTitle() {
    this.title = this.goToEdit ? 'Voltar' : 'Editar';
  }
}
