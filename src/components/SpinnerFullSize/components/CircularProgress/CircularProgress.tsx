import './CircularProgress.styles.css';

type Props = {
  size: number;
  backgroundColor?: string;
};

const CircularProgress = ({ size, backgroundColor = 'white' }: Props) => {
  return (
    <div
      className="spinner-wraper"
      style={{
        ['--loading-size' as any]: size,
        ['--spinner-background-color' as any]: backgroundColor,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      <div className="container-arc">
        <div className="arc arc-start" />
        <div className="arc arc-end" />
        <div className="arc arc-end2" />
        <div className="arc arc-end3" />
        <div className="arc arc-block" />
        <div className="circle-block" />
      </div>
    </div>
  );
};

export default CircularProgress;
