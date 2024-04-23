import Typography from '@material-ui/core/Typography';

interface Props {
  title: string;
  text: string;
}

function TourCard({ title, text }: Props) {
  return (
    <div>
      <Typography
        paragraph
        variant="h6"
        style={{
          fontFamily: 'Open Sans',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        {title}
      </Typography>
      <Typography
        paragraph
        variant="body1"
        style={{
          fontFamily: 'Open Sans',
          fontSize: 14,
        }}
      >
        {text}
      </Typography>
    </div>
  );
}

export default TourCard;
