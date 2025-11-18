import { Popover } from "@headlessui/react";
import { ReactElement, useRef } from "react";
import CourseEntry from "./Course";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";


export class CourseOverview<T extends string> {
    private readonly _categories;
    private _semesters: Semester<keyof typeof this._categories>[];

    constructor(categories: Record<T, Category>) {
        this._semesters = [];
        this._categories = categories;
    }

    public addSemester(name: string) {
        const sem = new Semester<keyof typeof this._categories>(this, name);
        this._semesters.push(sem);
        return sem;
    }

    public render(): ReactElement {
        let insert: string = "";

        for (const category of Object.values(this._categories) as Category[]) {
            insert += "\n"
            insert += category.accessibleDescription;
        }

        let renderers: SemesterRenderer<T>[] = [];
        for (const semester of this._semesters) {
            renderers.push(semester.getRenderer());
        }

        let rows: ReactElement[] = []
        let allDone = false;
        while (allDone === false) {
            let numDone = 0;
            const elements = []
            for (const renderer of renderers) {
                if (renderer.done) {
                    numDone += 1;
                }
                elements.push(renderer.renderNext());
            }

            rows.push(<tr className="" key={`courses-${rows.length}`}>
                {elements}
            </tr>)

            if (numDone === renderers.length) {
                allDone = true;
            }
        }

        const catKeys = Object.keys(this._categories) as T[];

        return (
            <>
                <div role="region" aria-labelledby="courseoverviewcap" className="w-full overflow-scroll snap-x snap-mandatory">
                    <table className="w-full table-fixed" style={{ minWidth: `${this._semesters.length * 7}rem` }}>
                        <caption id="courseoverviewcap" className="sr-only">
                            Each column of this table represents a semester of college. Each cell contains the course number of a class that I took or taught in that semester.
                            Each class is categorized based on its background color. The full name of the course appears in a tooltip on hover. For screen readers, the
                            category name is included in the tooltip. The categories are as follows:
                            {
                                insert
                            }
                        </caption>
                        <thead className="relative">
                            <tr className="">
                                {this._semesters.map(v => v.renderHeading())}
                            </tr>
                        </thead>

                        <tbody className="relative">
                            {rows}
                        </tbody>
                    </table>

                </div>

                <div className="grid align-middle justify-center flex-wrap items-center mt-2 gap-2 mx-auto" aria-hidden tabIndex={-1} style={{ maxWidth: `${8 * catKeys.length}rem`, gridTemplateColumns: `repeat(auto-fill, minmax(7rem,1fr)` }}>
                    {catKeys.map(v => <span key={`legend-${v}`} className={`flex w-full max-w-32 mx-auto self-center h-12 my-1 justify-center items-center rounded-md ${this._categories[v].className}`}>{v}</span>)}
                </div>
            </>
        )
    }

    public get categories() {
        return this._categories;
    }
}

class Semester<T extends string> {
    private readonly _ctx: CourseOverview<T>;
    private readonly _name: string;
    private _courses: Course<T>[];

    constructor(ctx: CourseOverview<T>, name: string) {
        this._ctx = ctx;
        this._name = name;
        this._courses = [];
    }

    public addCourse(name: string, abbreviation: string, category: T, url: string) {
        let c = new Course(this._ctx, name, abbreviation, category, url);
        this._courses.push(c)
        c.render();
    }

    public renderHeading(): ReactElement {
        return (
            <th key={`${this._name}-heading`} className="font-lato font-semibold" style={{ scrollSnapAlign: 'start' }}>{this._name}</th>
        )
    }

    public getRenderer() {
        return new SemesterRenderer(this._ctx, this._name, this._courses);
    }

}

class SemesterRenderer<T extends string> {
    private readonly _ctx: CourseOverview<T>;
    private readonly _name: string;
    private _courses: Course<T>[];
    private _row: number;

    constructor(ctx: CourseOverview<T>, name: string, courses: Course<T>[]) {
        this._ctx = ctx;
        this._name = name;
        this._courses = courses;
        this._row = -1;
    }

    public get done() {
        return this._row >= this._courses.length;
    }

    public renderNext() {
        this._row += 1;
        if (this.done) {
            return <td key={`${this._name}-${this._row}`}></td>;
        } else {
            const course = this._courses[this._row];
            return course?.render(`${this._name}-${course.number}`)
        }

    }

}

class Course<T extends string> {
    private readonly _ctx: CourseOverview<T>;
    private readonly _name: string;
    private readonly _abbreviation: string;
    private readonly _category: T;
    private readonly _url: string;

    constructor(ctx: CourseOverview<T>, name: string, abbreviation: string, category: T, url: string) {
        this._ctx = ctx;
        this._name = name;
        this._category = category;
        this._abbreviation = abbreviation;
        this._url = url;
    }

    public render(key?: string): ReactElement {
        return (<CourseEntry key={key ?? ""} name={this._name} abbreviation={this._abbreviation} categoryName={this._ctx.categories[this._category].name} className={this._ctx.categories[this._category].className} href={this._url} />)
    }

    public get number() {
        return this._abbreviation;
    }
}

export class Category {
    private readonly _name;
    private readonly _color;
    private readonly _classNames;
    private readonly _accessibleDescription;

    constructor(accessibleName: string, accessibleColor: string, classes: string, description: string) {
        this._name = accessibleName;
        this._color = accessibleColor;
        this._classNames = classes;
        this._accessibleDescription = description;
    }

    public get className() {
        return this._classNames;
    }

    public get description() {
        return this._accessibleDescription;
    }

    public get name() {
        return this._name;
    }

    public get color() {
        return this._color;
    }

    public get accessibleDescription() {
        return `${this._name} (${this._color}): ${this._accessibleDescription}`;
    }
}
