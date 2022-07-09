import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { FONT_SIZE_H3_DESKTOP, FONT_WEIGHT_SEMIBOLD } from '../../../utils/constants';
import { PrimaryTextField } from '../../../components/customComponents';

export default function CurrencyTab() {
  const [amount, setAmount] = useState('');

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Typography
          fontSize={FONT_SIZE_H3_DESKTOP}
          fontWeight={FONT_WEIGHT_SEMIBOLD}
        >Amount</Typography>
        <PrimaryTextField
          name="amount"
          placeholder="Amount"
          value={amount}
          onChange={handleAmount}
        />
      </Stack>
    </Stack>
  );
}