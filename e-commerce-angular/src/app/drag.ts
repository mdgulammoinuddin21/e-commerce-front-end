import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './_model/file-handle.model';

@Directive({
  selector: '[appDrag]'
})
export class Drag {

  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  @HostBinding('style.background') background = '#eee';

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener('dragover', ['$event'])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';

    if (!evt.dataTransfer || evt.dataTransfer.files.length === 0) {
      return;
    }

    let fileHandle: FileHandle | null = null;
    const file = evt.dataTransfer.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    );

    fileHandle = { file, url };
    this.files.emit(fileHandle);
  }
}
