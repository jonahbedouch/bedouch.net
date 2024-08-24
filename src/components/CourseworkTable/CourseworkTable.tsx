import * as React from 'react';
import { Category, CourseOverview } from './CourseworkTable.helper';


type Props<T extends string> = {
  courses: CourseOverview<T>
}

function CourseworkTable<T extends string>(props: Props<T>) {
  return props.courses.render();
}

export default CourseworkTable;
