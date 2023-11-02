import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';


function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Breadcrumb(props) {
  const breadcrumbs = (x) => [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href={x?.link}
    >
      {x?.title}
    </Link>
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {props?.name.map((x) => (
          breadcrumbs(x)
        ))}

      </Breadcrumbs>
    </Stack>
  );
}
