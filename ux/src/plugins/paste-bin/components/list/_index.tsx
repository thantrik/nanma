import * as React from "react";
import {
  DetailsHeader,
  DetailsList,
  IColumn,
  IDetailsHeaderProps,
  IDetailsList,
  IGroup,
  IRenderFunction,
  IToggleStyles,
  mergeStyles,
  IButtonStyles,
  CheckboxVisibility,
} from "@fluentui/react";

export interface IDetailsListGroupedExampleItem {
  key: string;
  name: string;
  color: string;
}

export interface IDetailsListGroupedExampleState {
  items: IDetailsListGroupedExampleItem[];
  groups: IGroup[];
  showItemIndexInView: boolean;
  isCompactMode: boolean;
}
const _blueGroupIndex = 2;

export class DocumentList extends React.Component<
  {},
  IDetailsListGroupedExampleState
> {
  private _root = React.createRef<IDetailsList>();
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this.state = {
      items: [
        { key: "a", name: "a", color: "red" },
        { key: "b", name: "b", color: "red" },
        { key: "c", name: "c", color: "blue" },
        { key: "d", name: "d", color: "blue" },
        { key: "e", name: "e", color: "blue" },
      ],
      // This is based on the definition of items
      groups: [
        {
          key: "groupred0",
          name: 'Color: "red"',
          startIndex: 0,
          count: 2,
          level: 0,
        },
        {
          key: "groupgreen2",
          name: 'Color: "green"',
          startIndex: 2,
          count: 0,
          level: 0,
        },
        {
          key: "groupblue2",
          name: 'Color: "blue"',
          startIndex: 2,
          count: 3,
          level: 0,
        },
      ],
      showItemIndexInView: true,
      isCompactMode: true,
    };

    this._columns = [
      {
        key: "name",
        name: "Name",
        fieldName: "name",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
      },
    ];
  }

  public componentWillUnmount() {
    if (this.state.showItemIndexInView) {
      const itemIndexInView = this._root.current!.getStartItemIndexInView();
      alert("first item index that was in view: " + itemIndexInView);
    }
  }

  public render() {
    const { items, groups, isCompactMode } = this.state;

    return (
      <div>
        {/* <DefaultButton
          onClick={this._addItem}
          text="Add an item"
          styles={addItemButtonStyles}
        /> */}
        <DetailsList
          componentRef={this._root}
          items={items}
          groups={groups}
          columns={this._columns}
          ariaLabelForSelectAllCheckbox="View files"
          ariaLabelForSelectionColumn=""
          checkButtonAriaLabel=""
          onRenderDetailsHeader={this._onRenderDetailsHeader}
          groupProps={{
            showEmptyGroups: true,
          }}
          checkboxVisibility={CheckboxVisibility.hidden}
          onRenderItemColumn={this._onRenderColumn}
          compact={false}
        />
      </div>
    );
  }

  private _addItem = (): void => {
    const items = this.state.items;
    const groups = [...this.state.groups];
    groups[_blueGroupIndex].count++;

    this.setState(
      {
        items: items.concat([
          {
            key: "item-" + items.length,
            name: "New item " + items.length,
            color: "blue",
          },
        ]),
        groups,
      },
      () => {
        if (this._root.current) {
          this._root.current.focusIndex(items.length, true);
        }
      }
    );
  };

  private _onRenderDetailsHeader(
    props?: IDetailsHeaderProps,
    _defaultRender?: IRenderFunction<IDetailsHeaderProps> | undefined
  ) {
    return (
      <DetailsHeader
        {...(props ? props : ({} as IDetailsHeaderProps))}
        ariaLabelForToggleAllGroupsButton={"View files"}
      />
    );
  }

  private _onRenderColumn(
    item: IDetailsListGroupedExampleItem,
    index?: number,
    column?: IColumn
  ) {
    const value =
      item && column && column.fieldName
        ? item[column.fieldName as keyof IDetailsListGroupedExampleItem] || ""
        : "";

    return <div data-is-focusable={true}>{value}</div>;
  }

  private _onShowItemIndexInViewChanged = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    checked?: boolean
  ): void => {
    this.setState({ showItemIndexInView: !!checked });
  };

  private _onChangeCompactMode = (
    ev: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ): void => {
    this.setState({ isCompactMode: !!checked });
  };
}
