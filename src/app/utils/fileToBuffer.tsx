
export const convertFilesToArrayBuffer = async(files: File[]): Promise<ArrayBuffer[]> => {
    return Promise.all(
        files.map(file => {
            return new Promise<ArrayBuffer>((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = () => {
                    resolve(reader.result as ArrayBuffer);
                };

                reader.onerror = () => {
                    reject(new Error(`Failed to read file: ${file.name}`));
                };

                reader.readAsArrayBuffer(file);
            });
        })
    );
};