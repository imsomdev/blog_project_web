import ContentServices from "@/services/content.services";
import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  RadioGroup,
  Radio,
  Progress,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import PollsResult from "./pollsResult/PollsResult";

const Poll = ({ onClose }: any) => {
  const [selectedChoice, setSelectedChoice] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isResult, setIsResult] = useState<boolean>(false);
  const [pollsResult, setPollsResult] = useState<any>({});
  const { data, isLoading, isError } = useQuery({
    queryKey: ["poll"],
    queryFn: () => ContentServices.gePollDetails(),
  });

  const submitPollMutation = useMutation({
    mutationFn: (payload: any) => ContentServices.submitPollDetails(payload),
    onSuccess: () => {
      const result_payload = {
        ques_id: data.id,
      };
      pollsResultMutation.mutate(result_payload);
      setTimeout(() => setIsResult(true), 300);
    },
    onError: (error: any) => setErrorMessage(error?.message),
  });

  const pollsResultMutation = useMutation({
    mutationFn: (result_payload: any) =>
      ContentServices.pollsResult(result_payload),
    onSuccess: (response: any) => {
      setPollsResult(response);
    },
    onError: (error: any) => setErrorMessage(error?.message),
  });

  const handleValueChange = (value: any) => {
    setSelectedChoice(value);
  };
  console.log(selectedChoice);

  const handlePollSubmit = () => {
    const payload = {
      ques_id: data.id,
      choice_id: selectedChoice,
    };

    submitPollMutation.mutate(payload);
  };

  console.log(pollsResult, "Result POLL");

  return (
    <>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {data?.question_text}
          </ModalHeader>
          <ModalBody>
            {!isResult ? (
              <>
                <RadioGroup
                  label="Select your choice"
                  onValueChange={handleValueChange}
                >
                  {data?.choices.map((question: any) => (
                    <Radio key={question.id} value={question.id}>
                      {question.choice_text}
                    </Radio>
                  ))}
                </RadioGroup>
                {errorMessage && (
                  <span className="text-xs text-red-500">{errorMessage}</span>
                )}
              </>
            ) : (
              pollsResult?.votes.map((choice: any) => (
                <Progress
                  key={choice.choice_text}
                  label={choice.choice_text}
                  size="sm"
                  value={choice.percentage}
                  maxValue={100}
                  color="primary"
                  formatOptions={{ style: "percent" }}
                  showValueLabel={true}
                  className="max-w-md"
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            {!isResult && (
              <Button color="primary" onClick={handlePollSubmit}>
                Submit
              </Button>
            )}
          </ModalFooter>
        </>
      </ModalContent>
    </>
  );
};

export default Poll;
