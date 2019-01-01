import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'wfmFilter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any, value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }

    return items.filter((item) => {
      // глубокая копия объекта
      const copy = Object.assign({}, item);

      if (!isNaN(copy[field])) {
        copy[field] += '';
      }

      if (field === 'type') {
        copy[field] = copy[field] === 'income' ? 'доход' : 'расход';
      }

      if (field === 'category') {
        copy[field] = copy['catName'];
      }

      return copy[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }
}
