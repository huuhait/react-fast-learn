import moment from 'moment';
import classNames from 'classnames';
import { useState } from 'react';
import {
  Format, TableColumn, ParseType, SortType, SortKind,
} from '~/types';
import Icon from './Icon';
import TableRow from './TableRow';
import '~/assets/styles/components/table.less';

interface Props<T> {
  title?: string
  loading?: boolean
  columns: TableColumn[]
  headEnabled?: boolean
  dataSource: T[]
  // border?: boolean
  // pagination?: boolean
  // page?: number
  // pageSize?: number
  scroll?: boolean
  hover?: boolean
  isLink?: boolean
  linkBuilder?: string
  selectedIndex?: number
  onClick?: React.MouseEventHandler<HTMLElement>
  className?: string
  scopedSlotsRenderFunc?: (item: T, column: TableColumn) => JSX.Element | undefined
  scopedSlotsHeadRenderFunc?: (column: TableColumn) => JSX.Element | undefined
}

function Table<T>(props: Props<T>) {
  const [sortBy, setSortBy] = useState('');
  const [sortKey, setSortKey] = useState<string>('');
  const [sortType, setSortType] = useState<SortKind>(SortKind.None);

  function changeSortKey(key: string, sort_by: SortType = SortType.String) {
    const column = props.columns.find((c) => c.key === key);
    if (!column?.sort) {
      return;
    }
    const current_key = sortKey;
    setSortKey(key);
    setSortBy(sort_by);
    if (current_key !== key) {
      setSortType(SortKind.Up);
      return;
    }
    if (sortType === SortKind.None) {
      setSortType(SortKind.Up);
    } else if (sortType === SortKind.Up) {
      setSortType(SortKind.Down);
    } else {
      setSortKey('');
      setSortType(SortKind.None);
    }
  }

  const getValueByKey = (key: string, item: any, parse?: ParseType, precision?: TableColumn['precision']) => {
    const column = props.columns.find((c) => c.key === key);
    let value;
    if (key.includes('.')) {
      const keys = key.split('.');
      let inv: any = null;
      for (let index = 0; index < keys.length; index++) {
        const k = keys[index];
        if (index === 0) {
          inv = item[k];
        } else {
          inv = inv[k];
        }
      }
      value = inv;
    } else {
      value = item[key];
    }
    if (parse === ParseType.Decimal) {
      const vprecision = typeof precision === 'function' ? precision(item) : precision;
      value = Number(value);
      if (value === 0) {
        value = '--';
      } else if (vprecision !== undefined && vprecision !== null) {
        value = value.toLocaleString(undefined, { minimumFractionDigits: vprecision, maximumFractionDigits: vprecision });
      }
    } else if (parse === ParseType.Time || parse === ParseType.DateTime) {
      switch (typeof value) {
        case 'number':
          value = moment.unix(value);
          break;
        case 'string':
          value = moment(value);
          break;
        default:
          break;
      }
    }
    if (column?.prefix) {
      const vprefix = typeof column.prefix === 'function' ? column.prefix(item) : column.prefix;
      value = `${vprefix} ${value}`;
    }
    if (column?.suffix) {
      const vsuffix = typeof column.suffix === 'function' ? column.suffix(item) : column.suffix;
      value = `${value} ${vsuffix}`;
    }
    return value;
  };

  const isSort = () => {
    for (const column of props.columns) {
      if (column.sort) return true;
    }
    return false;
  };

  const dataFilter = () => {
    if (!sortKey) return props.dataSource;
    if (sortType === SortKind.None) return props.dataSource;
    const data = [...props.dataSource];
    const sort_key = sortKey;
    data.sort((a: any, b: any) => {
      const a_value = getValueByKey(sort_key, a);
      const b_value = getValueByKey(sort_key, b);
      if (sortBy === SortType.Number) {
        return parseFloat(a_value) - parseFloat(b_value);
      }

      return a_value.localeCompare(b_value);
    });
    return sortType === SortKind.Down ? data.reverse() : data;
  };

  const indexSelected = () => {
    if (props.selectedIndex === -1 || !props.selectedIndex) return -1;
    const item_selected = props.dataSource[props.selectedIndex];
    const data = dataFilter();

    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      const eq = Object.is(item_selected, item);
      if (eq) return index;
    }
  };

  function routerLink(item: T) {
    if (!props.isLink) return;
    if (!props.linkBuilder) return;
    let { linkBuilder } = props;
    let start_index = 0;
    for (let i = 0; i < linkBuilder.length; i++) {
      const str = linkBuilder[i];
      if (str === '#') {
        start_index = i;
      }
      if (str === '}') {
        const param = linkBuilder.slice(start_index, i + 1);
        let param_key = param.replace(/#\{|\}/gi, '');
        const toUpper = param_key.includes('toUpper');
        const toLower = param_key.includes('toLower');
        if (toUpper) {
          param_key = param_key.replace('.toUpper', '');
        } else if (toLower) {
          param_key = param_key.replace('.toLower', '');
        }
        let value = getValueByKey(param_key, item);
        if (toUpper) {
          value = value.toUpperCase();
        } else if (toLower) {
          value = value.toLowerCase();
        }
        linkBuilder = linkBuilder.replace(param, value);
        i = 0;
      }
    }
    return linkBuilder;
  }

  return (
    <div
      className={`${classNames({
        table: true,
        'table-loading': props.loading,
        'table-scrollable': props.scroll,
        'table-hoverable': props.hover,
        'table-headable': props.headEnabled,
        'table-sortable': isSort(),
      })} ${props.className}`}
    >
      {(() => {
        if (props.title) {
          return (
            <div className="table-title">
              {props.title}
            </div>
          );
        }
      })()}
      <div className="table-head">
        {
            [...props.columns].filter((column) => !column.hideColumn).map((column) => (
              <span key={column.key} className={`${column.key} ${column.class} text-${column.align || 'left'}`}>
                <span className={`${column.sort ? 'table-head-sortable' : undefined}`} onClick={() => changeSortKey(column.key, column.sortBy)}>
                  {
                    column.headScopedSlots && props.scopedSlotsHeadRenderFunc ? props.scopedSlotsHeadRenderFunc(column) : (
                      <>
                        {column.title}
                        {(() => {
                          if (column.sort) {
                            return (
                              <div className="table-head-sort-caret">
                                <Icon type="caret-up" className={classNames({ up: true, active: sortKey === column.key && sortType === SortKind.Up })} />
                                <Icon type="caret-down" className={classNames({ down: true, active: sortKey === column.key && sortType === SortKind.Down })} />
                              </div>
                            );
                          }
                        })()}
                      </>
                    )
                  }
                </span>
              </span>
            ))
          }
      </div>
      <div className="table-content">
        {(() => {
          if (props.dataSource.length === 0) {
            return (
              <div className="table-empty w-full h-full flex flex-col items-center justify-center">
                <Icon type="print" />
                Empty
              </div>
            );
          }
          return dataFilter().map((item, index) => (
            <TableRow key={index} selected={indexSelected() === index} isLink={props.isLink} to={routerLink(item)} onClick={props.onClick}>
              {props.columns.map((column) => (
                <span
                  className={`table-row-col table-row-col-align-${column.align || 'left'} ${column.key.split('.')[column.key.split('.').length - 1]} ${column.class}`}
                  key={column.key}
                >
                  {column.scopedSlots && props.scopedSlotsRenderFunc ? props.scopedSlotsRenderFunc(item, column)
                    : (
                      <span className="table-row-col-content">
                        {(() => {
                          if (column.formatBy === Format.DateTime) {
                            return getValueByKey(column.key, item, column.parse).format('YYYY-MM-DD hh:mm:ss');
                          } if (column.formatBy === Format.Time) {
                            return getValueByKey(column.key, item, column.parse).format('hh:mm:ss');
                          } if (column.toUpper) {
                            return getValueByKey(column.key, item, column.parse).toUpperCase();
                          } if (column.toLower) {
                            return getValueByKey(column.key, item, column.parse).toLowerCase();
                          }
                          return getValueByKey(column.key, item, column.parse, column.precision);
                        })()}
                      </span>
                    )}
                </span>
              ))}
            </TableRow>
          ));
        })()}
      </div>
    </div>
  );
}

export default Table;
