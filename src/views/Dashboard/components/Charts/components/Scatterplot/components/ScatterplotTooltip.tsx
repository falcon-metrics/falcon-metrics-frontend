import startCase from 'lodash/startCase';
import { ReactNode } from 'react';

interface Props {
  title: string;
}

const Container = ({ children }: { children: ReactNode }) => (
  <div className="scatterplot-tooltip-container">{children}</div>
);

const Title = ({ title }: { title: string }) => (
  <div className="scatterplot-tooltip-title">
    <b>{title}</b>
  </div>
);

const InfoLine = ({
  displayName,
  value,
}: {
  displayName: string;
  value: string;
}) => (
  <div>
    <b>{displayName}: </b> {value}
  </div>
);

export type PropsSingle = {
  zingchartTokens: Array<{ displayName: string; tokenId: string }>;
} & Props;

export function ScatterplotTooltipSingle({
  title,
  zingchartTokens,
}: PropsSingle) {
  return (
    <Container>
      <Title title={'%' + title} />
      {zingchartTokens.map(({ displayName, tokenId }) => (
        <InfoLine
          key={tokenId}
          displayName={displayName}
          value={'%' + tokenId}
        />
      ))}
    </Container>
  );
}

export type TooltipDatum = {
  id: string;
};

export type PropsMultiple<T extends TooltipDatum> = {
  tooltipData: Array<T>;
  fieldsToExclude?: Extract<keyof T, string>[];
} & Props;

export function ScatterplotTooltipMultiple<T extends TooltipDatum>({
  tooltipData,
  fieldsToExclude,
}: PropsMultiple<T>) {
  const keys = Object.keys(tooltipData[0]).filter(
    (k) => typeof k === 'string',
  ) as Extract<keyof T, string>[];

  return (
    <Container>
      {keys
        .filter((key) => {
          if (fieldsToExclude?.includes(key)) {
            return false;
          }
          const set = new Set(tooltipData.map((d) => d[key]));
          return set.size === 1;
        })
        .map((key) => (
          <InfoLine
            key={key}
            displayName={startCase(key)}
            value={tooltipData[0][String(key)]}
          />
        ))}
      <>
        <br />
        <b>IDs ({tooltipData.length}): </b>
        <div className="scatterplot-tooltip-list-box">
          <ol>
            {tooltipData.map(({ id }) => (
              <li key={id} className="scatterplot-tooltip-list-item">
                <span>{id}</span>
              </li>
            ))}
          </ol>
        </div>
      </>
    </Container>
  );
}
